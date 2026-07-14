/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Image, Text} from '@salesforce/retail-react-app/app/components/shared/ui'
import Link from '@salesforce/retail-react-app/app/components/link'
import {useCategory} from '@salesforce/commerce-sdk-react'
import {
    getImageUrl,
    resolveCategoryId,
    resolveCategoryName,
    categoryHref
} from '../../utils'

/**
 * Page Designer `commerce_assets.popularCategory` — square 1:1 category tile.
 */
export const PopularCategory = ({category, catDisplayName, image, imagesize, offset}) => {
    const categoryId = resolveCategoryId(category)
    const {data: categoryData} = useCategory(
        {parameters: {id: categoryId}},
        {enabled: Boolean(categoryId)}
    )

    const label = resolveCategoryName(categoryData || category, catDisplayName)
    const imageURL =
        getImageUrl(image) ||
        categoryData?.image ||
        categoryData?.c_slotBannerImage ||
        null
    const href = categoryHref(categoryId)

    if (!categoryId) return null

    return (
        <Link to={href} className="pd-popular-category rc-category-strip__tile">
            <Box
                className="rc-category-strip__tile-media"
                overflow="hidden"
                borderTopRadius="inherit"
                aspectRatio={1}
                bg="gray.100"
            >
                {imageURL ? (
                    <Image
                        src={imageURL}
                        alt={label}
                        loading="lazy"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        objectPosition={offset || 'center'}
                        style={imagesize ? {maxWidth: imagesize.split(' ')[0]} : undefined}
                    />
                ) : (
                    <Box
                        w="100%"
                        h="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text color="gray.500" fontSize="sm">
                            {label}
                        </Text>
                    </Box>
                )}
            </Box>
            <Text as="span">{label}</Text>
        </Link>
    )
}

PopularCategory.displayName = 'PopularCategory'

PopularCategory.propTypes = {
    category: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    catDisplayName: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    imagesize: PropTypes.string,
    offset: PropTypes.string
}

export default PopularCategory
