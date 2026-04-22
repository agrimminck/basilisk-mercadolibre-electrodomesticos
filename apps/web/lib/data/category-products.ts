import type { FeaturedProductCurated } from './featured-products'

const categoryProducts: Record<string, FeaturedProductCurated[]> = {
  'electrodomesticos': [
    { id: 'cocina-mademsa-4-platos',      mlcId: 'MLC18952592', badge: 'Más vendido' },
    { id: 'microondas-samsung-23l',       mlcId: 'MLC42069415' },
    { id: 'hervidor-oster-2-5l',          mlcId: 'MLC18907190' },
    { id: 'aspiradora-electrolux',        mlcId: 'MLC20537394' },
    { id: 'ac-midea-split',               mlcId: 'MLC19030680', badge: 'Oferta' },
  ],
  'refrigeradores': [
    { id: 'refri-mademsa-med165-negro',   mlcId: 'MLC19516037', badge: 'Más vendido' },
    { id: 'refri-mademsa-med165-inox',    mlcId: 'MLC19516036' },
  ],
  'lavadoras': [
    { id: 'lavadora-lg-frontal',          mlcId: 'MLC24826892', badge: 'Más vendido' },
  ],
  'electronica-audio-y-video': [
    { id: 'samsung-43-au7090-4k',         mlcId: 'MLC19488911', badge: 'Más vendido' },
    { id: 'samsung-55-4k',                mlcId: 'MLC20615512' },
    { id: 'tcl-55-qled-4k',               mlcId: 'MLC49863622' },
    { id: 'lg-50-ut7300',                 mlcId: 'MLC37037191' },
    { id: 'samsung-50-tu7090',            mlcId: 'MLC16268688' },
    { id: 'philips-50-google-tv',         mlcId: 'MLC32462716' },
    { id: 'philips-50-ambilight',         mlcId: 'MLC32440893', badge: 'Destacado' },
    { id: 'lg-32-hd-2023',               mlcId: 'MLC28010090' },
  ],
  'computacion': [
    { id: 'asus-vivobook-go-14-r5-8gb',   mlcId: 'MLC45899898', badge: 'Más vendido' },
    { id: 'asus-vivobook-go-14-r5-16gb',  mlcId: 'MLC54240461' },
    { id: 'asus-vivobook-go-14-e1404g',   mlcId: 'MLC28531178' },
    { id: 'asus-vivobook-go-14-r5-b',     mlcId: 'MLC41602869' },
    { id: 'hp-245-g10-r5-512gb',          mlcId: 'MLC38692460' },
    { id: 'hp-245-g10-r3-512gb',          mlcId: 'MLC39243137' },
    { id: 'hp-245-g10-r3-256gb',          mlcId: 'MLC50525240' },
  ],
  'celulares-y-telefonia': [
    { id: 'samsung-galaxy-a16-128gb',     mlcId: 'MLC44372580', badge: 'Más vendido' },
    { id: 'xiaomi-redmi-note14-pro-5g',   mlcId: 'MLC45748930', badge: 'Destacado' },
    { id: 'moto-g34-5g-256gb-negro',      mlcId: 'MLC35221837' },
    { id: 'xiaomi-redmi-note14-pro-4g',   mlcId: 'MLC45748907' },
    { id: 'xiaomi-redmi-note14-pro-plus', mlcId: 'MLC45748092' },
    { id: 'moto-g34-5g-256gb-azul',       mlcId: 'MLC34730431' },
    { id: 'xiaomi-redmi-note14-pro-12g',  mlcId: 'MLC53175787' },
    { id: 'moto-g34-5g-128gb',            mlcId: 'MLC34105052' },
  ],
  'herramientas': [
    { id: 'bosch-gsb185-li-18v',          mlcId: 'MLC26643188', badge: 'Más vendido' },
    { id: 'bosch-gsb18v-90c',             mlcId: 'MLC28841480' },
    { id: 'bosch-gsb185-li-maletin',      mlcId: 'MLC27495962' },
    { id: 'bosch-gsb18-ve-ec',            mlcId: 'MLC15761336' },
    { id: 'makita-ga7020-7-2200w',        mlcId: 'MLC15318536' },
    { id: 'makita-m0901b-4-5',            mlcId: 'MLC18467352' },
    { id: 'makita-9557hpg-840w',          mlcId: 'MLC13088632' },
    { id: 'makita-m9502g-115mm',          mlcId: 'MLC19770378' },
  ],
}

export function getCategoryProducts(slug: string): FeaturedProductCurated[] {
  return categoryProducts[slug] ?? []
}
