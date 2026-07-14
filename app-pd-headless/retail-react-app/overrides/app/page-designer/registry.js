/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {registry} from '@salesforce/commerce-sdk-react/page-designer'

/**
 * Register Page Designer component importers.
 * Type IDs must match Shopper Experience `component.typeId` from BM (`{group}.{componentId}`).
 */
export function initializeRegistry() {
    // --- Commerce assets ---
    registry.registerImporter('commerce_assets.imageAndText', () =>
        import('./assets/image-with-text')
    )
    registry.registerImporter('commerce_assets.imageTile', () => import('./assets/image-tile'))
    registry.registerImporter('commerce_assets.photoTile', () => import('./assets/image-tile'))
    registry.registerImporter('commerce_assets.editorialRichText', () =>
        import('./assets/editorial-rich-text')
    )
    registry.registerImporter('commerce_assets.productTile', () => import('./assets/product-tile'))
    registry.registerImporter('commerce_assets.mainBanner', () => import('./assets/main-banner'))
    registry.registerImporter('commerce_assets.campaignBanner', () =>
        import('./assets/campaign-banner')
    )
    registry.registerImporter('commerce_assets.category', () => import('./assets/category'))
    registry.registerImporter('commerce_assets.popularCategory', () =>
        import('./assets/popular-category')
    )
    registry.registerImporter('commerce_assets.shopTheLook', () => import('./assets/shop-the-look'))
    registry.registerImporter('commerce_assets.productListTile', () =>
        import('./assets/product-list-tile')
    )

    // --- Commerce layouts ---
    registry.registerImporter('commerce_layouts.mobileGrid1r1c', () =>
        import('./layouts/mobileGrid1r1c')
    )
    registry.registerImporter('commerce_layouts.mobileGrid2r1c', () =>
        import('./layouts/mobileGrid2r1c')
    )
    registry.registerImporter('commerce_layouts.mobileGrid2r2c', () =>
        import('./layouts/mobileGrid2r2c')
    )
    registry.registerImporter('commerce_layouts.mobileGrid2r3c', () =>
        import('./layouts/mobileGrid2r3c')
    )
    registry.registerImporter('commerce_layouts.mobileGrid3r1c', () =>
        import('./layouts/mobileGrid3r1c')
    )
    registry.registerImporter('commerce_layouts.mobileGrid3r2c', () =>
        import('./layouts/mobileGrid3r2c')
    )
    registry.registerImporter('commerce_layouts.mobileGrid3r2c1', () =>
        import('./layouts/mobileGrid3r2c1')
    )
    registry.registerImporter('commerce_layouts.carousel', () => import('./layouts/carousel'))
    registry.registerImporter('commerce_layouts.popularCategories', () =>
        import('./layouts/popularCategories')
    )
    registry.registerImporter('commerce_layouts.mobileGridLookBook', () =>
        import('./layouts/mobileGridLookBook')
    )

    // --- Dynamic ---
    registry.registerImporter('dynamic.productDetail', () => import('./dynamic/product-detail'))
    registry.registerImporter('dynamic.productList', () => import('./dynamic/product-list'))
    registry.registerImporter('dynamic.dynamicCategoryBanner', () =>
        import('./dynamic/dynamic-category-banner')
    )

    // --- Einstein ---
    registry.registerImporter('einstein.einsteinCarousel', () =>
        import('./einstein/einstein-carousel')
    )
    registry.registerImporter('einstein.einsteinCarouselCategory', () =>
        import('./einstein/einstein-carousel')
    )
    registry.registerImporter('einstein.einsteinCarouselProduct', () =>
        import('./einstein/einstein-carousel')
    )
}
