import {
  Controller,
  Post,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { SyncService, SyncResult } from './sync.service'
import { ApiKeyGuard } from './api-key.guard'

@Controller('sync')
@UseGuards(ApiKeyGuard)
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  /**
   * Sincroniza un producto por ASIN.
   * Requiere header X-Api-Key y query param ?category=<slug>
   *
   * Ejemplo: POST /api/sync/asin/B09LMXMK5X?category=peripherals
   */
  @Post('asin/:asin')
  @HttpCode(HttpStatus.OK)
  async SyncAsin(
    @Param('asin') asin: string,
    @Query('category') categorySlug: string,
  ): Promise<SyncResult> {
    return this.syncService.SyncByAsin(asin.toUpperCase(), categorySlug)
  }

  /**
   * Busca en Amazon por keyword y sincroniza todos los resultados.
   * Requiere header X-Api-Key y query params ?keyword=...&category=<slug>
   *
   * Ejemplo: POST /api/sync/search?keyword=gaming+monitor&category=monitors
   */
  @Post('search')
  @HttpCode(HttpStatus.OK)
  async SyncSearch(
    @Query('keyword') keyword: string,
    @Query('category') categorySlug: string,
    @Query('searchIndex') searchIndex?: string,
  ): Promise<SyncResult[]> {
    return this.syncService.SyncByKeyword(keyword, categorySlug, searchIndex)
  }
}
