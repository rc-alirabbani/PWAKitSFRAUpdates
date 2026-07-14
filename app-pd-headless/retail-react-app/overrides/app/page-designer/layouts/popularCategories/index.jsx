/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 */
/* eslint-disable react/prop-types -- PD regions prop shape from API */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Heading, SimpleGrid} from '@salesforce/retail-react-app/app/components/shared/ui'
import {
    Component,
    regionPropType,
    componentPropType
} from '@salesforce/commerce-sdk-react/page-designer'

const DEFAULT_HEADING = 'Shop by category'

/**
 * Popular categories layout — Shop-by-category band matching Royal Cyber design.
 */
export const PopularCategories = ({regions = [], component, textHeadline}) => {
    const tiles = regions.flatMap((region) => region.components || [])
    const heading =
        (typeof textHeadline === 'string' && textHeadline.trim()) ||
        textHeadline?.html ||
        textHeadline?.markup ||
        DEFAULT_HEADING

    return (
        <Box
            className="popular-categories-layout rc-category-strip"
            w="100%"
            py={{base: 8, md: 10}}
            bg="#f5f5f5"
        >
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
            <SimpleGrid
                className="rc-category-strip__grid"
                columns={{base: 2, md: 4}}
                spacing={{base: 3, md: 4}}
                maxW="1200px"
                mx="auto"
                px={{base: 4, md: 6}}
            >
                {tiles.map((tile, index) => (
                    <Component key={tile?.id || index} component={tile} />
                ))}
            </SimpleGrid>
        </Box>
    )
}

PopularCategories.displayName = 'PopularCategories'

PopularCategories.propTypes = {
    component: componentPropType,
    regions: PropTypes.arrayOf(regionPropType).isRequired,
    textHeadline: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default PopularCategories
