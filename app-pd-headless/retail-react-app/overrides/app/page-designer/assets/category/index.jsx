/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {Box, SimpleGrid, Heading, Text} from '@salesforce/retail-react-app/app/components/shared/ui'
import Link from '@salesforce/retail-react-app/app/components/link'
import {
    getImageUrl,
    getMarkupHtml,
    resolveCategoryId,
    resolveCategoryName,
    categoryHref
} from '../../utils'

/**
 * Page Designer `commerce_assets.category` (Link Banner) — heading + category link grid.
 */
export const CategoryLinkBanner = ({
    textHeadline,
    image,
    applyImageShade,
    changeTextColor,
    category1,
    customCategoryName1,
    category2,
    customCategoryName2,
    category3,
    customCategoryName3,
    category4,
    customCategoryName4,
    category5,
    customCategoryName5,
    category6,
    customCategoryName6,
    category7,
    customCategoryName7,
    category8,
    customCategoryName8,
    category9,
    customCategoryName9,
    category10,
    customCategoryName10,
    category11,
    customCategoryName11,
    category12,
    customCategoryName12
}) => {
    const headlineHtml = getMarkupHtml(textHeadline)
    const bgUrl = getImageUrl(image)

    const categories = useMemo(() => {
        const pairs = [
            [category1, customCategoryName1],
            [category2, customCategoryName2],
            [category3, customCategoryName3],
            [category4, customCategoryName4],
            [category5, customCategoryName5],
            [category6, customCategoryName6],
            [category7, customCategoryName7],
            [category8, customCategoryName8],
            [category9, customCategoryName9],
            [category10, customCategoryName10],
            [category11, customCategoryName11],
            [category12, customCategoryName12]
        ]
        return pairs
            .map(([cat, customName]) => {
                const id = resolveCategoryId(cat)
                if (!id) return null
                return {
                    id,
                    name: resolveCategoryName(cat, customName),
                    href: categoryHref(id)
                }
            })
            .filter(Boolean)
    }, [
        category1,
        customCategoryName1,
        category2,
        customCategoryName2,
        category3,
        customCategoryName3,
        category4,
        customCategoryName4,
        category5,
        customCategoryName5,
        category6,
        customCategoryName6,
        category7,
        customCategoryName7,
        category8,
        customCategoryName8,
        category9,
        customCategoryName9,
        category10,
        customCategoryName10,
        category11,
        customCategoryName11,
        category12,
        customCategoryName12
    ])

    if (!headlineHtml && categories.length === 0) return null

    const textColor = changeTextColor ? 'white' : '#004a82'

    return (
        <Box
            className="pd-category-banner"
            position="relative"
            overflow="hidden"
            borderRadius="lg"
            p={{base: 6, md: 10}}
            mb={6}
            backgroundImage={bgUrl ? `url("${String(bgUrl).replace(/"/g, '%22')}")` : undefined}
            backgroundSize="cover"
            backgroundPosition="center"
            bg={!bgUrl ? 'gray.50' : undefined}
        >
            {bgUrl && applyImageShade ? (
                <Box position="absolute" inset={0} bg="blackAlpha.400" pointerEvents="none" />
            ) : null}

            <Box position="relative" zIndex={1}>
                {headlineHtml ? (
                    <Heading
                        as="div"
                        size="lg"
                        mb={6}
                        textAlign="center"
                        color={textColor}
                        dangerouslySetInnerHTML={{__html: headlineHtml}}
                    />
                ) : null}

                <SimpleGrid columns={{base: 2, md: 3, lg: 4}} spacing={4}>
                    {categories.map((cat) => (
                        <Link key={cat.id} to={cat.href}>
                            <Box
                                bg={changeTextColor ? 'whiteAlpha.200' : 'white'}
                                borderWidth="1px"
                                borderColor={changeTextColor ? 'whiteAlpha.400' : 'gray.200'}
                                borderRadius="md"
                                px={4}
                                py={3}
                                textAlign="center"
                                transition="all 0.2s"
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'md',
                                    borderColor: 'orange.400'
                                }}
                            >
                                <Text fontWeight="700" color={textColor} fontSize="sm">
                                    {cat.name}
                                </Text>
                            </Box>
                        </Link>
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    )
}

CategoryLinkBanner.displayName = 'CategoryLinkBanner'

CategoryLinkBanner.propTypes = {
    textHeadline: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    applyImageShade: PropTypes.bool,
    changeTextColor: PropTypes.bool,
    category1: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    customCategoryName1: PropTypes.string,
    category2: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    customCategoryName2: PropTypes.string,
    category3: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    customCategoryName3: PropTypes.string,
    category4: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    customCategoryName4: PropTypes.string,
    category5: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    customCategoryName5: PropTypes.string,
    category6: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    customCategoryName6: PropTypes.string,
    category7: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    customCategoryName7: PropTypes.string,
    category8: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    customCategoryName8: PropTypes.string,
    category9: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    customCategoryName9: PropTypes.string,
    category10: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    customCategoryName10: PropTypes.string,
    category11: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    customCategoryName11: PropTypes.string,
    category12: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    customCategoryName12: PropTypes.string
}

export default CategoryLinkBanner
