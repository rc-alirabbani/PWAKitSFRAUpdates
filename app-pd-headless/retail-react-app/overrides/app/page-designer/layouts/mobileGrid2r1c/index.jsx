/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 */
/* eslint-disable react/prop-types -- optional PD layout props */
import React from 'react'
import PropTypes from 'prop-types'
import {SimpleGrid, Box} from '@salesforce/retail-react-app/app/components/shared/ui'
import {
    Region,
    regionPropType,
    componentPropType
} from '@salesforce/commerce-sdk-react/page-designer'

/**
 * 2 row × 1 col on mobile, 1 row × 2 col on desktop (text + image split sections).
 */
export const MobileGrid2r1c = ({regions, component, sectionClassCol2}) => (
    <Box
        className={`section-wrapper pd-split-section ${sectionClassCol2 || ''}`}
        w="100%"
        py={{base: 10, md: 14, lg: 16}}
        px={{base: 4, md: 6, lg: 8}}
        bg="white"
    >
        <Box className="section-container" w="100%" mx="auto" maxW="1200px">
            <SimpleGrid
                className="mobile-2r-1c"
                columns={{base: 1, md: 2}}
                spacing={{base: 8, md: 10, lg: 12}}
                alignItems="center"
            >
                {regions.map((region) => (
                    <Box key={region.id} className="pd-split-section__cell" minW={0}>
                        <Region component={component} regionId={region.id} />
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    </Box>
)

MobileGrid2r1c.displayName = 'MobileGrid2r1c'

MobileGrid2r1c.propTypes = {
    component: componentPropType.isRequired,
    regions: PropTypes.arrayOf(regionPropType).isRequired,
    sectionClassCol2: PropTypes.string
}

export default MobileGrid2r1c
