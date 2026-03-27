"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const category_entity_1 = require("../categories/category.entity");
const product_entity_1 = require("../products/product.entity");
dotenv.config();
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [category_entity_1.CategoryEntity, product_entity_1.ProductEntity],
    synchronize: true,
});
const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG ?? 'gamegear0b-20';
function AmazonUrl(asin) {
    return `https://www.amazon.com/dp/${asin}?tag=${PARTNER_TAG}`;
}
function AmazonImageUrl(asin) {
    return `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SCLZZZZZZZ_.jpg`;
}
const CATEGORIES = [
    {
        name: 'Monitors',
        slug: 'monitors',
        description: 'Gaming monitors — refresh rate, resolution, and response time compared.',
    },
    {
        name: 'GPUs',
        slug: 'gpus',
        description: 'Graphics cards for every budget, from 1080p to 4K gaming.',
    },
    {
        name: 'Peripherals',
        slug: 'peripherals',
        description: 'Gaming mice trusted by competitive players.',
    },
    {
        name: 'Keyboards',
        slug: 'keyboards',
        description: 'Mechanical and optical gaming keyboards for every play style.',
    },
    {
        name: 'Headsets',
        slug: 'headsets',
        description: 'Gaming headsets with spatial audio, wireless freedom, and pro-grade mics.',
    },
    {
        name: 'Gaming Chairs',
        slug: 'gaming-chairs',
        description: 'Chairs built for long sessions — ergonomics and comfort reviewed.',
    },
];
const PRODUCTS = [
    {
        categorySlug: 'monitors',
        asin: 'B09B3HPQLG',
        name: 'LG 27GP850-B 27" QHD IPS 165Hz',
        slug: 'lg-27gp850-b',
        description: 'Fast IPS panel with 1ms GtG response time, 165Hz refresh rate, and Nano IPS technology for vivid colors. A top pick for competitive gaming without breaking the bank.',
        price: 279.99,
        rating: 4.6,
        reviewCount: 8420,
    },
    {
        categorySlug: 'monitors',
        asin: 'B08LWZXHXJ',
        name: 'ASUS ROG Swift PG279QM 27" QHD 240Hz',
        slug: 'asus-rog-swift-pg279qm',
        description: 'WQHD IPS monitor at 240Hz with NVIDIA G-Sync and DisplayHDR 400. Built for high-refresh competitive play with excellent color accuracy.',
        price: 499.99,
        rating: 4.5,
        reviewCount: 3210,
    },
    {
        categorySlug: 'monitors',
        asin: 'B088HH6LW5',
        name: 'Samsung Odyssey G7 32" QHD 240Hz',
        slug: 'samsung-odyssey-g7-32',
        description: '1000R curved VA panel at 240Hz with 1ms response time. Exceptional contrast ratio and HDR600 support make this one of the best curved gaming monitors available.',
        price: 449.99,
        rating: 4.4,
        reviewCount: 12800,
    },
    {
        categorySlug: 'monitors',
        asin: 'B08ZDB8GTM',
        name: 'AOC CQ27G2 27" QHD Curved 144Hz',
        slug: 'aoc-cq27g2',
        description: '1500R curved VA panel with QHD resolution and 144Hz refresh rate. Adaptive-Sync compatible and priced for budget-conscious builders who refuse to compromise on size.',
        price: 199.99,
        rating: 4.5,
        reviewCount: 11200,
    },
    {
        categorySlug: 'monitors',
        asin: 'B0BJCVHKL6',
        name: 'Alienware AW2723DF 27" QHD 280Hz',
        slug: 'alienware-aw2723df',
        description: 'Fast IPS at 280Hz with 1ms GtG — among the fastest QHD panels on the market. AMD FreeSync Premium Pro and G-Sync Compatible for tear-free gameplay at any frame rate.',
        price: 599.99,
        rating: 4.7,
        reviewCount: 4380,
    },
    {
        categorySlug: 'monitors',
        asin: 'B09BJTKCJR',
        name: 'BenQ MOBIUZ EX2510S 25" FHD 165Hz',
        slug: 'benq-mobiuz-ex2510s',
        description: 'IPS panel at 165Hz with HDRi and BenQ\'s built-in speaker system. A compact, accurate display that punches above its price for esports and competitive shooters.',
        price: 229.99,
        rating: 4.4,
        reviewCount: 3750,
    },
    {
        categorySlug: 'monitors',
        asin: 'B0C8QKB4QR',
        name: 'LG UltraGear 32GQ850-B 32" QHD 260Hz',
        slug: 'lg-ultragear-32gq850-b',
        description: 'Nano IPS at 32" and 260Hz — a rare combination. VESA DisplayHDR 600, 1ms GtG, and G-Sync Compatible. For players who want both screen real estate and extreme refresh rate.',
        price: 699.99,
        rating: 4.6,
        reviewCount: 2100,
    },
    {
        categorySlug: 'gpus',
        asin: 'B0BKYHKFFX',
        name: 'ASUS Dual GeForce RTX 4070 12GB',
        slug: 'asus-dual-rtx-4070',
        description: 'NVIDIA Ada Lovelace architecture with 12GB GDDR6X. Excellent 1440p performance with DLSS 3 and Frame Generation support. Runs cool and quiet under load.',
        price: 549.99,
        rating: 4.7,
        reviewCount: 5670,
    },
    {
        categorySlug: 'gpus',
        asin: 'B0CJM71P92',
        name: 'XFX Speedster MERC 310 RX 7800 XT 16GB',
        slug: 'xfx-merc310-rx-7800-xt',
        description: 'AMD RDNA 3 with 16GB GDDR6 — more VRAM than the competition at this price. Dominates at 1440p and holds up well at 4K. No ray-tracing tax.',
        price: 479.99,
        rating: 4.5,
        reviewCount: 2890,
    },
    {
        categorySlug: 'gpus',
        asin: 'B0C7BKBY5Y',
        name: 'MSI Gaming GeForce RTX 4060 Ti 8GB',
        slug: 'msi-gaming-rtx-4060-ti',
        description: 'The sweet spot for 1080p at max settings and solid 1440p gaming. DLSS 3 and low power draw (160W) make it ideal for mid-range builds.',
        price: 369.99,
        rating: 4.4,
        reviewCount: 4120,
    },
    {
        categorySlug: 'gpus',
        asin: 'B0CS4G7HFP',
        name: 'ASUS TUF Gaming RTX 4080 Super OC 16GB',
        slug: 'asus-tuf-rtx-4080-super',
        description: '16GB GDDR6X with the full Ada Lovelace AD103 die. Handles 4K gaming with headroom to spare. DLSS 3.5 with Ray Reconstruction brings next-gen visuals to demanding titles.',
        price: 999.99,
        rating: 4.8,
        reviewCount: 3140,
    },
    {
        categorySlug: 'gpus',
        asin: 'B0C7BFRSGH',
        name: 'Gigabyte GeForce RTX 4060 Windforce OC 8GB',
        slug: 'gigabyte-rtx-4060-windforce',
        description: 'Entry-level Ada Lovelace with efficient 115W TDP. A strong upgrade for 1080p high-refresh gaming, with DLSS 3 adding bonus frames in supported titles.',
        price: 299.99,
        rating: 4.3,
        reviewCount: 6800,
    },
    {
        categorySlug: 'gpus',
        asin: 'B0BQPTDG1N',
        name: 'Sapphire Nitro+ RX 7900 XTX 24GB',
        slug: 'sapphire-nitro-rx-7900-xtx',
        description: '24GB GDDR6 on a 384-bit bus — the top of AMD\'s RDNA 3 stack. Crushes 4K and even competes in 8K scenarios. Best rasterization performance per dollar at the high end.',
        price: 979.99,
        rating: 4.7,
        reviewCount: 1850,
    },
    {
        categorySlug: 'gpus',
        asin: 'B0CJYM7PJW',
        name: 'PowerColor Red Devil RX 7700 XT 12GB',
        slug: 'powercolor-red-devil-rx-7700-xt',
        description: '12GB GDDR6 at a budget-friendly price. Solid 1080p and capable 1440p performance with FSR 3 support. Great value for builders who want AMD\'s driver stack.',
        price: 349.99,
        rating: 4.4,
        reviewCount: 2300,
    },
    {
        categorySlug: 'peripherals',
        asin: 'B09LMXMK5X',
        name: 'Logitech G Pro X Superlight 2',
        slug: 'logitech-g-pro-x-superlight-2',
        description: 'Weighs just 60g with the HERO 2 25K sensor. Preferred by pro FPS players worldwide. 95-hour battery life and zero compromises on tracking accuracy.',
        price: 159.99,
        rating: 4.8,
        reviewCount: 9340,
    },
    {
        categorySlug: 'peripherals',
        asin: 'B0B6YSZFKQ',
        name: 'Razer DeathAdder V3 HyperSpeed',
        slug: 'razer-deathadder-v3-hyperspeed',
        description: 'Ergonomic right-handed shape with Focus Pro 30K optical sensor. The DeathAdder design has been refined over a decade — this is its best version yet.',
        price: 99.99,
        rating: 4.7,
        reviewCount: 6780,
    },
    {
        categorySlug: 'peripherals',
        asin: 'B075HD6S3J',
        name: 'SteelSeries Rival 650 Wireless',
        slug: 'steelseries-rival-650-wireless',
        description: 'Dual-sensor system for near-zero lift-off distance. Adjustable weight system and customizable RGB. Reliable 24-hour wireless battery with 15-minute quick charge.',
        price: 119.99,
        rating: 4.3,
        reviewCount: 3210,
    },
    {
        categorySlug: 'peripherals',
        asin: 'B0B17XRBZK',
        name: 'Logitech G502 X Plus Wireless',
        slug: 'logitech-g502-x-plus',
        description: 'LIGHTFORCE hybrid optical-mechanical switches in the main buttons. LIGHTSPEED wireless at 130-hour battery. The iconic G502 weight and button layout, now untethered.',
        price: 149.99,
        rating: 4.6,
        reviewCount: 5120,
    },
    {
        categorySlug: 'peripherals',
        asin: 'B09LCFJWXY',
        name: 'Zowie EC2-C Gaming Mouse',
        slug: 'zowie-ec2-c',
        description: 'No software, no RGB, plug-and-play. The EC2-C features the 3610 sensor, paracord cable, and the ergonomic EC shape trusted by pro CS:GO and Valorant players.',
        price: 69.99,
        rating: 4.5,
        reviewCount: 4400,
    },
    {
        categorySlug: 'peripherals',
        asin: 'B0CG3TBWDX',
        name: 'Razer Viper V3 HyperSpeed',
        slug: 'razer-viper-v3-hyperspeed',
        description: 'Ambidextrous wireless mouse with Focus X 30K optical sensor. 280-hour battery life and HyperSpeed low-latency wireless. The most affordable esports wireless option from Razer.',
        price: 79.99,
        rating: 4.6,
        reviewCount: 7650,
    },
    {
        categorySlug: 'keyboards',
        asin: 'B09DGQSYKL',
        name: 'SteelSeries Apex Pro TKL Wireless',
        slug: 'steelseries-apex-pro-tkl-wireless',
        description: 'Adjustable OmniPoint 2.0 magnetic switches with per-key actuation from 0.1 to 4.0mm. The most customizable gaming keyboard ever made, now with 200-hour wireless.',
        price: 199.99,
        rating: 4.7,
        reviewCount: 6200,
    },
    {
        categorySlug: 'keyboards',
        asin: 'B07D5S24W2',
        name: 'Corsair K70 RGB MK.2 Mechanical',
        slug: 'corsair-k70-rgb-mk2',
        description: 'Aircraft-grade aluminum frame with Cherry MX switches. Per-key RGB, dedicated media controls, and a USB pass-through port. A durable, feature-rich tenkeyless option.',
        price: 129.99,
        rating: 4.5,
        reviewCount: 21400,
    },
    {
        categorySlug: 'keyboards',
        asin: 'B0B7ZB8VXH',
        name: 'Razer BlackWidow V4 Pro',
        slug: 'razer-blackwidow-v4-pro',
        description: 'Razer Yellow optical switches, multi-function roller, media keys, and Razer Chroma RGB. Full-size layout with wrist rest included — suited for long typing and gaming sessions.',
        price: 229.99,
        rating: 4.5,
        reviewCount: 3870,
    },
    {
        categorySlug: 'keyboards',
        asin: 'B09TPLVJZM',
        name: 'Logitech G Pro X TKL Mechanical',
        slug: 'logitech-g-pro-x-tkl',
        description: 'Swappable GX mechanical switches in a tournament-grade TKL form factor. Used by Logitech-sponsored esports athletes. No numpad means more mousepad room.',
        price: 109.99,
        rating: 4.6,
        reviewCount: 8900,
    },
    {
        categorySlug: 'keyboards',
        asin: 'B08BSVMK29',
        name: 'HyperX Alloy Origins Core TKL',
        slug: 'hyperx-alloy-origins-core',
        description: 'HyperX Red linear switches on a solid steel frame. NGENUITY software for RGB customization. One of the best budget TKL keyboards with zero flex and excellent build quality.',
        price: 79.99,
        rating: 4.7,
        reviewCount: 14300,
    },
    {
        categorySlug: 'keyboards',
        asin: 'B0BJDGZ4CV',
        name: 'Wooting 60HE+ Compact 60%',
        slug: 'wooting-60he-plus',
        description: 'Lekker switches with Rapid Trigger — activate at 0.1mm for the fastest possible response in FPS titles. The keyboard of choice for top Valorant and CS2 players globally.',
        price: 174.99,
        rating: 4.9,
        reviewCount: 3100,
    },
    {
        categorySlug: 'headsets',
        asin: 'B09ZPVJCRN',
        name: 'SteelSeries Arctis Nova Pro Wireless',
        slug: 'steelseries-arctis-nova-pro-wireless',
        description: 'Dual-wireless with simultaneous Bluetooth and 2.4GHz. Infinite battery via hot-swappable packs and active noise cancellation. The most complete wireless gaming headset available.',
        price: 349.99,
        rating: 4.5,
        reviewCount: 5430,
    },
    {
        categorySlug: 'headsets',
        asin: 'B09X4ZSPDY',
        name: 'HyperX Cloud Alpha Wireless',
        slug: 'hyperx-cloud-alpha-wireless',
        description: 'Legendary Cloud comfort with 300-hour wireless battery life. Dual-chamber drivers reduce distortion across the frequency range. A standout for marathon gaming sessions.',
        price: 179.99,
        rating: 4.7,
        reviewCount: 12600,
    },
    {
        categorySlug: 'headsets',
        asin: 'B08PL1FWL5',
        name: 'Logitech G535 Lightspeed Wireless',
        slug: 'logitech-g535-lightspeed',
        description: 'Only 236g — one of the lightest wireless headsets available. LIGHTSPEED wireless, 33-hour battery, and clean microphone performance. Ideal for players sensitive to headset weight.',
        price: 99.99,
        rating: 4.4,
        reviewCount: 7800,
    },
    {
        categorySlug: 'headsets',
        asin: 'B0BL8DFMLM',
        name: 'Razer BlackShark V2 Pro (2023)',
        slug: 'razer-blackshark-v2-pro-2023',
        description: 'TriForce Titanium 50mm drivers with HyperClear Super Wideband mic — broadcast quality straight out of the box. 70-hour battery and 2.4GHz wireless for competitive play.',
        price: 199.99,
        rating: 4.6,
        reviewCount: 9200,
    },
    {
        categorySlug: 'headsets',
        asin: 'B094BSKMQV',
        name: 'Corsair HS80 RGB Wireless',
        slug: 'corsair-hs80-rgb-wireless',
        description: 'Dolby Atmos spatial audio with plush memory foam earcups and a flexible microphone. 20-hour battery on a lightweight frame. Strong value for immersive single-player titles.',
        price: 99.99,
        rating: 4.3,
        reviewCount: 6100,
    },
    {
        categorySlug: 'headsets',
        asin: 'B0C9NZ2DHJ',
        name: 'Astro A50 X Gen 5 Wireless',
        slug: 'astro-a50-x-gen-5',
        description: 'Base station charging with simultaneous PS5, Xbox, and PC switching. 24-bit/96kHz audio and 40-hour battery. The multi-platform solution for multi-console setups.',
        price: 379.99,
        rating: 4.5,
        reviewCount: 2900,
    },
    {
        categorySlug: 'gaming-chairs',
        asin: 'B09BS1NKJT',
        name: 'Secretlab Titan Evo 2022 Series',
        slug: 'secretlab-titan-evo-2022',
        description: 'Cold-cure foam, magnetic memory foam neck pillow, and 4-way lumbar support. The benchmark for gaming chairs — used by esports organizations globally.',
        price: 429.00,
        rating: 4.6,
        reviewCount: 7120,
    },
    {
        categorySlug: 'gaming-chairs',
        asin: 'B07X9PVPJH',
        name: 'Corsair TC100 RELAXED Gaming Chair',
        slug: 'corsair-tc100-relaxed',
        description: 'High-density foam with a wider, relaxed fit design. Adjustable lumbar pillow and headrest, 90–165° recline, and a solid steel frame at an accessible price.',
        price: 249.99,
        rating: 4.2,
        reviewCount: 5430,
    },
    {
        categorySlug: 'gaming-chairs',
        asin: 'B00K3PN4DY',
        name: 'DXRacer Formula Series Gaming Chair',
        slug: 'dxracer-formula-series',
        description: 'The chair that launched the gaming chair category. Bucket seat design, high back support, and adjustable armrests. Fits up to 5\'11" / 200 lbs.',
        price: 329.00,
        rating: 4.1,
        reviewCount: 18900,
    },
    {
        categorySlug: 'gaming-chairs',
        asin: 'B087WG8TN7',
        name: 'Noblechairs Hero Black Edition',
        slug: 'noblechairs-hero-black',
        description: 'Cold foam padding with a steel frame and tilt mechanism. XL size accommodates up to 6\'2" / 265 lbs. Premium build quality and clean aesthetics for those who prefer understated setups.',
        price: 449.00,
        rating: 4.5,
        reviewCount: 4250,
    },
    {
        categorySlug: 'gaming-chairs',
        asin: 'B01M7XSXPE',
        name: 'RESPAWN 110 Racing Style Gaming Chair',
        slug: 'respawn-110-racing',
        description: 'Segmented padding design, adjustable headrest and lumbar pillow, retractable footrest, and 135° recline. Solid entry-level option for gamers setting up their first dedicated space.',
        price: 199.99,
        rating: 4.1,
        reviewCount: 22700,
    },
];
async function Seed() {
    await dataSource.initialize();
    console.log('Connected to database');
    const categoryRepo = dataSource.getRepository(category_entity_1.CategoryEntity);
    const productRepo = dataSource.getRepository(product_entity_1.ProductEntity);
    const categoryMap = new Map();
    for (const cat of CATEGORIES) {
        let entity = await categoryRepo.findOne({ where: { slug: cat.slug } });
        if (!entity) {
            entity = categoryRepo.create(cat);
            await categoryRepo.save(entity);
            console.log(`Created category: ${cat.name}`);
        }
        else {
            console.log(`Skipped existing category: ${cat.name}`);
        }
        categoryMap.set(cat.slug, entity.id);
    }
    for (const product of PRODUCTS) {
        const categoryId = categoryMap.get(product.categorySlug);
        if (!categoryId)
            continue;
        const exists = await productRepo.findOne({ where: { externalId: product.asin } });
        if (exists) {
            const newImageUrl = AmazonImageUrl(product.asin);
            const newAffiliateUrl = AmazonUrl(product.asin);
            const needsUpdate = exists.imageUrl !== newImageUrl || exists.affiliateUrl !== newAffiliateUrl;
            if (needsUpdate) {
                exists.imageUrl = newImageUrl;
                exists.affiliateUrl = newAffiliateUrl;
                await productRepo.save(exists);
                console.log(`Updated image/affiliateUrl for: ${product.name}`);
            }
            else {
                console.log(`Skipped existing product: ${product.name}`);
            }
            continue;
        }
        const entity = productRepo.create({
            externalId: product.asin,
            affiliateSource: 'amazon',
            name: product.name,
            slug: product.slug,
            description: product.description,
            imageUrl: AmazonImageUrl(product.asin),
            price: product.price,
            currency: 'USD',
            affiliateUrl: AmazonUrl(product.asin),
            categoryId,
            rating: product.rating,
            reviewCount: product.reviewCount,
            available: true,
        });
        await productRepo.save(entity);
        console.log(`Created product: ${product.name}`);
    }
    console.log('Seed complete');
    await dataSource.destroy();
}
Seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map