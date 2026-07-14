/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Skeleton} from '@salesforce/retail-react-app/app/components/shared/ui'
import {useProduct} from '@salesforce/commerce-sdk-react'
import ProductTile from '@salesforce/retail-react-app/app/components/product-tile'
import {resolveProductId} from '../../utils'

/**
 * Page Designer `commerce_assets.productTile` — fetches product by ID and renders storefront ProductTile.
 */
export const PageDesignerProductTile = ({product, displayRatings: _displayRatings = false}) => {
    const productId = resolveProductId(product)
    const {data, isLoading, error} = useProduct(
        {
            parameters: {
                id: productId,
                allImages: true
            }
        },
        {enabled: Boolean(productId)}
    )

    if (!productId) return null

    if (isLoading) {
        return (
            <Box className="pd-product-tile" p={2}>
                <Skeleton height="220px" borderRadius="md" mb={3} />
                <Skeleton height="16px" mb={2} />
                <Skeleton height="14px" width="40%" />
            </Box>
        )
    }

    if (error || !data) return null

    return (
        <Box className="pd-product-tile">
            <ProductTile
                product={data}
                dynamicImageProps={{
                    widths: ['50vw', '50vw', '20vw', '20vw', '25vw']
                }}
            />
        </Box>
    )
}

PageDesignerProductTile.displayName = 'PageDesignerProductTile'

PageDesignerProductTile.propTypes = {
    product: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    displayRatings: PropTypes.bool
}

export default PageDesignerProductTile
