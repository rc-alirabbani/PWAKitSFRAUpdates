/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
/* eslint-disable react/prop-types -- PD regions prop shape from API */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Heading, Stack} from '@salesforce/retail-react-app/app/components/shared/ui'
import {
    Region,
    regionPropType,
    componentPropType
} from '@salesforce/commerce-sdk-react/page-designer'

/**
 * Popular categories layout — matches app_custom_headless
 * `commerce_layouts/popularCategories.json` (heading `textHeadline`, region `categories`).
 */
export const PopularCategories = ({regions, component, textHeadline}) => (
    <Box className="popular-categories-layout" maxW="1200px" mx="auto">
        {textHeadline ? (
            <Heading as="h2" size="md" mb={4} textAlign="center">
                {textHeadline}
            </Heading>
        ) : null}
        <Stack spacing={4}>
            {regions.map((region) => (
                <Region key={region.id} component={component} regionId={region.id} />
            ))}
        </Stack>
    </Box>
)

PopularCategories.displayName = 'PopularCategories'

PopularCategories.propTypes = {
    component: componentPropType.isRequired,
    regions: PropTypes.arrayOf(regionPropType).isRequired,
    textHeadline: PropTypes.string
}

export default PopularCategories
