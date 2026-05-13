/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {registry} from '@salesforce/commerce-sdk-react/page-designer'

/**
 * Register Page Designer component importers. Base template registry omits common headless assets
 * (image tile, editorial rich text, carousel); without these, getPage JSON renders empty regions.
 *
 * Type IDs: `{namespace}.{componentId}` — must match Shopper Experience `component.typeId` from BM.
 */
export function initializeRegistry() {
    registry.registerImporter('commerce_assets.imageAndText', () =>
        import('@salesforce/retail-react-app/app/page-designer/assets/image-with-text')
    )
    registry.registerImporter('commerce_assets.productTile', () =>
        import('@salesforce/retail-react-app/app/page-designer/assets/image-with-text')
    )

    registry.registerImporter('commerce_assets.imageTile', () => import('./assets/image-tile'))
    registry.registerImporter('commerce_assets.photoTile', () => import('./assets/image-tile'))

    registry.registerImporter('commerce_assets.editorialRichText', () =>
        import('./assets/editorial-rich-text')
    )

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
}
