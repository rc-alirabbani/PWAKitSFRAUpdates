/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Heading, SimpleGrid, Skeleton, Text} from '@salesforce/retail-react-app/app/components/shared/ui'
import {useParams} from 'react-router-dom'
import {Region, regionPropType, componentPropType} from '@salesforce/commerce-sdk-react/page-designer'
import {useProductSearch} from '@salesforce/commerce-sdk-react'
import ProductTile from '@salesforce/retail-react-app/app/components/product-tile'
import {resolveCategoryId} from '../../utils'

/**
 * Page Designer `dynamic.productList` — category product grid + promotional regions.
 */
export const DynamicProductList = ({categoryId, regions = [], component}) => {
    const params = useParams()
    const id = resolveCategoryId(categoryId) || params.categoryId

    const {data, isLoading} = useProductSearch(
        {
            parameters: {
                refine: [`cgid=${id}`, 'htype=master'],
                expand: ['promotions', 'variations', 'prices', 'images'],
                limit: 24
            }
        },
        {enabled: Boolean(id)}
    )

    const hits = data?.hits || []

    return (
        <Box className="pd-dynamic-product-list" maxW="1200px" mx="auto" px={4} py={6}>
            {!id ? (
                <Text color="gray.600">No category selected for this product list.</Text>
            ) : isLoading ? (
                <SimpleGrid columns={{base: 2, md: 3, lg: 4}} spacing={4}>
                    {Array.from({length: 8}).map((_, i) => (
                        <Skeleton key={i} height="280px" borderRadius="md" />
                    ))}
                </SimpleGrid>
            ) : (
                <>
                    <Heading as="h1" size="lg" color="#004a82" mb={6}>
                        {data?.selectedRefinements?.cgid || id}
                    </Heading>
                    <SimpleGrid columns={{base: 2, md: 3, lg: 4}} spacing={4}>
                        {hits.map((product) => (
                            <ProductTile
                                key={product.productId || product.id}
                                product={product}
                                dynamicImageProps={{widths: ['50vw', '30vw', '20vw']}}
                            />
                        ))}
                    </SimpleGrid>
                </>
            )}

            {regions?.length ? (
                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={4} mt={8}>
                    {regions.map((region) =>
                        component ? (
                            <Region key={region.id} component={component} regionId={region.id} />
                        ) : null
                    )}
                </SimpleGrid>
            ) : null}
        </Box>
    )
}

DynamicProductList.displayName = 'DynamicProductList'

DynamicProductList.propTypes = {
    categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    regions: PropTypes.arrayOf(regionPropType),
    component: componentPropType,
    displayFormat: PropTypes.any
}

export default DynamicProductList
