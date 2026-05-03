import {registry} from '@salesforce/commerce-sdk-react'

export function initializeRegistry() {
  // Commerce Assets
  registry.registerImporter('commerce_assets.photoTile', () =>
    import('./assets/image-tile')
  )

  registry.registerImporter('commerce_assets.imageAndText', () =>
    import('./assets/image-with-text')
  )

  registry.registerImporter('commerce_assets.editorialRichText', () =>
    import('./assets/editorial-rich-text')
  )

  // Commerce Layouts
  registry.registerImporter('commerce_layouts.carousel', () =>
    import('./layouts/carousel')
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
}