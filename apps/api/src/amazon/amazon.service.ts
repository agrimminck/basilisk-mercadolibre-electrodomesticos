import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import type { Product } from '@affiliate-gaming/shared';

// ─── Tipos internos de la PA-API v5 ───────────────────────────────────────────

interface AmazonListing {
  Price?: { Amount: number; Currency: string; DisplayAmount: string };
  Availability?: { Type: string };
}

interface AmazonProductRaw {
  ASIN: string;
  DetailPageURL: string;
  ItemInfo: {
    Title: { DisplayValue: string };
  };
  Offers?: {
    Listings?: AmazonListing[];
  };
  Images?: {
    Primary?: {
      Large?: { URL: string };
    };
  };
  CustomerReviews?: {
    StarRating?: { Value: number };
    Count?: number;
  };
}

interface GetItemsResponse {
  ItemsResult?: {
    Items: AmazonProductRaw[];
  };
  Errors?: Array<{ Code: string; Message: string }>;
}

interface SearchItemsResponse {
  SearchResult?: {
    Items: AmazonProductRaw[];
  };
  Errors?: Array<{ Code: string; Message: string }>;
}

// Recursos que pedimos en cada request para poblar el tipo Product
const PAAPI_RESOURCES = [
  'ItemInfo.Title',
  'Offers.Listings.Price',
  'Offers.Listings.Availability.Type',
  'Images.Primary.Large',
  'CustomerReviews.StarRating',
  'CustomerReviews.Count',
] as const;

// ─── Servicio ──────────────────────────────────────────────────────────────────

@Injectable()
export class AmazonService implements OnModuleInit {
  private readonly logger = new Logger(AmazonService.name);

  private signer!: SignatureV4;
  private partnerTag!: string;
  private marketplace!: string;

  // PA-API v5 siempre firma contra us-east-1 independientemente del marketplace
  private readonly host = 'webservices.amazon.com';
  private readonly region = 'us-east-1';
  private readonly service = 'ProductAdvertisingAPI';

  constructor(private readonly config: ConfigService) {}

  onModuleInit(): void {
    this.partnerTag = this.config.getOrThrow<string>('AMAZON_PARTNER_TAG');
    this.marketplace = this.config.get<string>(
      'AMAZON_MARKETPLACE',
      'www.amazon.com',
    );

    this.signer = new SignatureV4({
      credentials: {
        accessKeyId: this.config.getOrThrow<string>('AMAZON_ACCESS_KEY'),
        secretAccessKey: this.config.getOrThrow<string>('AMAZON_SECRET_KEY'),
      },
      region: this.region,
      service: this.service,
      sha256: Sha256,
    });
  }

  // ─── Métodos públicos ──────────────────────────────────────────────────────

  /**
   * Obtiene un producto de Amazon por ASIN y lo convierte al tipo Product.
   * Devuelve null si el ASIN no existe o si hay un error de la API.
   */
  async GetProductByAsin(asin: string): Promise<Product | null> {
    this.logger.log(`Fetching product from Amazon: ${asin}`);

    const response = await this.CallApi<GetItemsResponse>(
      '/paapi5/getitems',
      'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems',
      {
        ItemIds: [asin],
        Resources: PAAPI_RESOURCES,
        PartnerTag: this.partnerTag,
        PartnerType: 'Associates',
        Marketplace: this.marketplace,
      },
    );

    if (!response) return null;

    if (response.Errors?.length) {
      this.logger.error(`PA-API errors for ASIN ${asin}: ${JSON.stringify(response.Errors)}`);
      return null;
    }

    const item = response.ItemsResult?.Items?.[0];
    if (!item) return null;

    return this.MapToProduct(item);
  }

  /**
   * Busca productos en Amazon por keyword.
   * Devuelve un array vacío en caso de error.
   */
  async SearchProducts(keyword: string, searchIndex = 'Electronics'): Promise<Product[]> {
    this.logger.log(`Searching Amazon products: "${keyword}" in ${searchIndex}`);

    const response = await this.CallApi<SearchItemsResponse>(
      '/paapi5/searchitems',
      'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems',
      {
        Keywords: keyword,
        SearchIndex: searchIndex,
        Resources: PAAPI_RESOURCES,
        PartnerTag: this.partnerTag,
        PartnerType: 'Associates',
        Marketplace: this.marketplace,
        ItemCount: 10,
      },
    );

    if (!response) return [];

    if (response.Errors?.length) {
      this.logger.error(`PA-API errors for keyword "${keyword}": ${JSON.stringify(response.Errors)}`);
      return [];
    }

    return (response.SearchResult?.Items ?? []).map((item) =>
      this.MapToProduct(item),
    );
  }

  // ─── Helpers privados ──────────────────────────────────────────────────────

  /**
   * Firma y ejecuta un request a la PA-API v5.
   * Devuelve null si la llamada HTTP falla.
   */
  private async CallApi<T>(
    path: string,
    target: string,
    payload: Record<string, unknown>,
  ): Promise<T | null> {
    const body = JSON.stringify(payload);
    const now = new Date();

    // Los headers deben estar en minúsculas para SignatureV4
    const requestToSign = {
      method: 'POST',
      hostname: this.host,
      path,
      protocol: 'https:',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        host: this.host,
        'x-amz-date': FormatAmzDate(now),
        'x-amz-target': target,
        'content-encoding': 'amz-1.0',
      } as Record<string, string>,
      body,
    };

    let signedRequest: Awaited<ReturnType<typeof this.signer.sign>>;
    try {
      signedRequest = await this.signer.sign(requestToSign);
    } catch (err) {
      this.logger.error(`Failed to sign PA-API request: ${String(err)}`);
      return null;
    }

    let res: Response;
    try {
      res = await fetch(`https://${this.host}${path}`, {
        method: 'POST',
        headers: signedRequest.headers as Record<string, string>,
        body,
      });
    } catch (err) {
      this.logger.error(`PA-API network error: ${String(err)}`);
      return null;
    }

    if (!res.ok) {
      const errorBody = await res.text();
      this.logger.error(`PA-API HTTP ${res.status}: ${errorBody}`);
      return null;
    }

    return res.json() as Promise<T>;
  }

  /**
   * Convierte un item crudo de la PA-API v5 al tipo Product compartido.
   *
   * El slug se deriva del título: minúsculas, sin caracteres especiales,
   * palabras separadas por guiones, con el ASIN al final para garantizar unicidad.
   * Ejemplo: "Logitech G Pro X Mouse" + "B08L5LQ3GM" → "logitech-g-pro-x-mouse-B08L5LQ3GM"
   */
  private MapToProduct(item: AmazonProductRaw): Product {
    const listing = item.Offers?.Listings?.[0];
    const now = new Date();

    return {
      id: item.ASIN,
      asin: item.ASIN,
      name: item.ItemInfo.Title.DisplayValue,
      slug: BuildSlug(item.ItemInfo.Title.DisplayValue, item.ASIN),
      description: '',
      imageUrl: item.Images?.Primary?.Large?.URL ?? '',
      price: listing?.Price?.Amount ?? 0,
      currency: listing?.Price?.Currency ?? 'USD',
      affiliateUrl: item.DetailPageURL,
      categoryId: '',
      rating: item.CustomerReviews?.StarRating?.Value ?? null,
      reviewCount: item.CustomerReviews?.Count ?? null,
      available: listing?.Availability?.Type === 'Now',
      createdAt: now,
      updatedAt: now,
    };
  }
}

// ─── Utilidades de módulo ──────────────────────────────────────────────────────

/**
 * Formatea una fecha al formato requerido por AWS Signature V4: yyyyMMddTHHmmssZ
 */
function FormatAmzDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Genera un slug SEO-friendly a partir de un título y un ASIN.
 * El ASIN al final garantiza unicidad sin necesidad de buscar en DB.
 */
function BuildSlug(title: string, asin: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);

  return `${base}-${asin.toLowerCase()}`;
}
