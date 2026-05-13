/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
/* eslint-disable react/prop-types -- PD regions prop shape from API */
import React from 'react'
import PropTypes from 'prop-types'
import {SimpleGrid} from '@salesforce/retail-react-app/app/components/shared/ui'
import {
    Region,
    regionPropType,
    componentPropType
} from '@salesforce/commerce-sdk-react/page-designer'

/**
 * Shop The Look layout — matches app_custom_headless
 * `commerce_layouts/mobileGridLookBook.json` (regions column1 … column6).
 */
export const MobileGridLookBook = ({regions, component}) => (
    <SimpleGrid
        className="mobile-grid-look-book"
        columns={{base: 2, sm: 3, md: 6}}
        gridGap={4}
        maxW="1200px"
        mx="auto"
    >
        {regions.map((region) => (
            <Region key={region.id} component={component} regionId={region.id} />
        ))}
    </SimpleGrid>
)

MobileGridLookBook.displayName = 'MobileGridLookBook'

MobileGridLookBook.propTypes = {
    component: componentPropType.isRequired,
    regions: PropTypes.arrayOf(regionPropType).isRequired
}

export default MobileGridLookBook
