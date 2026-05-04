/*
 * Page Designer component registry (headless).
 * Type IDs must match Business Manager component exports (e.g. commerce_assets.photoTile).
 *
 * Each registerImporter uses dynamic import() — chunks load lazily when the SDK renders a type.
 * preloadPageDesignerChunks() walks getPage JSON and warms those chunks on the client after fetch
 * so BM iframe preview avoids a long cascade of per-component Suspense flashes.
 */
import {registry} from '@salesforce/commerce-sdk-react/page-designer'

function walkComponents(components, typeIds) {
    if (!Array.isArray(components)) return
    for (const cmp of components) {
        if (cmp?.typeId) typeIds.add(cmp.typeId)
        if (Array.isArray(cmp?.regions)) {
            for (const nested of cmp.regions) {
                walkComponents(nested?.components, typeIds)
            }
        }
    }
}

/**
 * Collect Shopper Experience component type ids present on a page payload.
 * @param {object | null | undefined} page
 * @returns {Set<string>}
 */
export function collectPageComponentTypeIds(page) {
    const typeIds = new Set()
    if (!page?.regions) return typeIds
    for (const region of page.regions) {
        walkComponents(region?.components, typeIds)
    }
    return typeIds
}

/**
 * Preload registered PD component chunks for types used on this page (client only).
 * Unknown BM-only types are skipped (preload rejects are swallowed per id).
 * @param {object | null | undefined} page
 * @returns {Promise<void>}
 */
export async function preloadPageDesignerChunks(page) {
    const ids = collectPageComponentTypeIds(page)
    await Promise.all(
        [...ids].map((id) =>
            registry.preload(id).catch(() => {
                /* type not in registry */
            })
        )
    )
}

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
