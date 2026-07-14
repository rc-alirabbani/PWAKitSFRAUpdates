/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 */
/* eslint-disable react/prop-types -- optional PD layout props */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Heading, SimpleGrid} from '@salesforce/retail-react-app/app/components/shared/ui'
import {
    Region,
    regionPropType,
    componentPropType
} from '@salesforce/commerce-sdk-react/page-designer'

/**
 * 2×2 mobile / 1×4 desktop grid.
 * When used for category tiles in BM, set optional `textHeadline` (custom attr) or
 * place an Editorial Rich Text "Shop by category" above this layout.
 * Also shows a default heading when `showCategoryHeading` is true / class suggests category strip.
 */
export const MobileGrid2r2c = ({
    regions,
    component,
    sectionClassCol1,
    textHeadline,
    showCategoryHeading
}) => {
    const childTypes = regions.flatMap((r) => r.components || []).map((c) => c.typeId)
    const looksLikeCategoryStrip = childTypes.some(
        (t) =>
            t === 'commerce_assets.popularCategory' ||
            t === 'commerce_assets.imageAndText' ||
            t === 'commerce_assets.photoTile'
    )

    const heading =
        (typeof textHeadline === 'string' && textHeadline.trim()) ||
        (showCategoryHeading || looksLikeCategoryStrip ? 'Shop by category' : null)

    return (
        <Box
            className={`section-wrapper ${sectionClassCol1 || ''} ${
                heading ? 'rc-category-strip' : ''
            }`}
            w="100%"
            py={heading ? {base: 8, md: 10} : undefined}
            bg={heading ? '#f5f5f5' : undefined}
        >
            {heading ? (
                <Heading
                    as="h2"
                    className="rc-category-strip__heading"
                    fontSize={{base: '2xl', md: '40px'}}
                    fontWeight="700"
                    color="#004a82"
                    textAlign="center"
                    mb={5}
                >
                    {heading}
                </Heading>
            ) : null}
            <Box className="section-container" w="100%" mx="auto" maxW="1200px" px={{base: 4, md: 6}}>
                <SimpleGrid className="mobile-2r-2c" columns={{base: 2, sm: 4}} gridGap={4}>
                    {regions.map((region) => (
                        <Region key={region.id} component={component} regionId={region.id} />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    )
}

MobileGrid2r2c.displayName = 'MobileGrid2r2c'

MobileGrid2r2c.propTypes = {
    component: componentPropType.isRequired,
    regions: PropTypes.arrayOf(regionPropType).isRequired,
    sectionClassCol1: PropTypes.string,
    textHeadline: PropTypes.string,
    showCategoryHeading: PropTypes.bool
}

export default MobileGrid2r2c
