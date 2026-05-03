/*
 * Page Designer component registry (headless).
 * Type IDs must match Business Manager component exports (e.g. commerce_assets.photoTile).
 */
import {registry} from '@salesforce/commerce-sdk-react/page-designer'

export function initializeRegistry() {
    // Commerce assets — local implementations
    registry.registerImporter('commerce_assets.photoTile', () => import('./assets/image-tile'))
    registry.registerImporter('commerce_assets.imageTile', () => import('./assets/image-tile'))

    registry.registerImporter('commerce_assets.imageAndText', () =>
        import('@salesforce/retail-react-app/app/page-designer/assets/image-with-text')
    )
    registry.registerImporter('commerce_assets.productTile', () =>
        import('@salesforce/retail-react-app/app/page-designer/assets/image-with-text')
    )

    registry.registerImporter('commerce_assets.editorialRichText', () =>
        import('./assets/editorial-rich-text')
    )

    // Commerce layouts
    registry.registerImporter('commerce_layouts.carousel', () => import('./layouts/carousel'))

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
}
