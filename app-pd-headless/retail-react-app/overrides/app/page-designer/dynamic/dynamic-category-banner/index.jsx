/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Heading, Skeleton} from '@salesforce/retail-react-app/app/components/shared/ui'
import {useCategory, useProduct} from '@salesforce/commerce-sdk-react'
import {getImageUrl, resolveCategoryId, resolveProductId} from '../../utils'

/**
 * Page Designer `dynamic.dynamicCategoryBanner`.
 */
export const DynamicCategoryBanner = ({categoryId, productId, image, heading}) => {
    const catId = resolveCategoryId(categoryId)
    const prodId = resolveProductId(productId)

    const {data: category, isLoading: catLoading} = useCategory(
        {parameters: {id: catId}},
        {enabled: Boolean(catId)}
    )
    const {data: product, isLoading: prodLoading} = useProduct(
        {parameters: {id: prodId, allImages: true}},
        {enabled: Boolean(prodId) && !catId}
    )

    const isLoading = catLoading || prodLoading
    const title = heading || category?.name || product?.name || ''
    const bannerImage =
        getImageUrl(image) ||
        category?.c_slotBannerImage ||
        category?.image ||
        getImageUrl(product?.imageGroups?.[0]?.images?.[0])

    if (isLoading) {
        return <Skeleton height="180px" borderRadius="md" mb={4} />
    }

    if (!title && !bannerImage) return null

    return (
        <Box
            className="pd-dynamic-category-banner"
            position="relative"
            minH="180px"
            borderRadius="lg"
            overflow="hidden"
            mb={6}
            backgroundImage={
                bannerImage ? `url("${String(bannerImage).replace(/"/g, '%22')}")` : undefined
            }
            backgroundSize="cover"
            backgroundPosition="center"
            bg={!bannerImage ? '#004a82' : undefined}
        >
            <Box
                position="absolute"
                inset={0}
                bg="blackAlpha.500"
                pointerEvents="none"
            />
            {title ? (
                <Heading
                    as="h1"
                    position="relative"
                    zIndex={1}
                    color="white"
                    size="xl"
                    p={{base: 6, md: 10}}
                >
                    {title}
                </Heading>
            ) : null}
        </Box>
    )
}

DynamicCategoryBanner.displayName = 'DynamicCategoryBanner'

DynamicCategoryBanner.propTypes = {
    categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    productId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    heading: PropTypes.string
}

export default DynamicCategoryBanner
