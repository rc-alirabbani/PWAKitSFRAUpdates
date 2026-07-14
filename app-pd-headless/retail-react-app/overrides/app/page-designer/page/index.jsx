/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React, {Suspense} from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import {Box, Skeleton} from '@salesforce/retail-react-app/app/components/shared/ui'
import {Region} from '@salesforce/commerce-sdk-react/page-designer'

/**
 * Custom Page Designer page shell.
 *
 * The SDK `<Page>` wraps all regions in Bootstrap-style `.container`, which:
 * - squeezes full-bleed banners (mainBanner / hero)
 * - does not match how BM authors expect the page to lay out on headless
 *
 * This renderer keeps region order from the API but controls width/bleed per region.
 */
const PageDesignerPage = ({page}) => {
    const {id, regions = [], pageDescription, pageKeywords, pageTitle} = page || {}

    const findRegion = (regionId) => regions.find((r) => r.id === regionId)
    const headerbanner = findRegion('headerbanner')
    const main = findRegion('main')
    const legalnotice = findRegion('legalnotice')

    // Unknown regions (future page types) still render in API order
    const knownIds = new Set(['headerbanner', 'main', 'legalnotice'])
    const otherRegions = regions.filter((r) => !knownIds.has(r.id))

    const regionFallback = (
        <Box p={4}>
            <Skeleton height="200px" />
        </Box>
    )

    return (
        <Box id={id} className="pd-store-page page" w="100%" maxW="100%">
            <Helmet>
                {pageTitle ? <title>{pageTitle}</title> : null}
                {pageDescription ? <meta name="description" content={pageDescription} /> : null}
                {pageKeywords ? <meta name="keywords" content={pageKeywords} /> : null}
            </Helmet>

            {headerbanner ? (
                <Box className="pd-region pd-region--headerbanner" w="100%">
                    <Suspense fallback={regionFallback}>
                        <Region page={page} regionId="headerbanner" />
                    </Suspense>
                </Box>
            ) : null}

            {main ? (
                <Box as="main" className="pd-region pd-region--main" w="100%">
                    <Suspense fallback={regionFallback}>
                        <Region page={page} regionId="main" />
                    </Suspense>
                </Box>
            ) : null}

            {otherRegions.map((region) => (
                <Box key={region.id} className={`pd-region pd-region--${region.id}`} w="100%">
                    <Suspense fallback={regionFallback}>
                        <Region page={page} regionId={region.id} />
                    </Suspense>
                </Box>
            ))}

            {legalnotice ? (
                <Box
                    className="pd-region pd-region--legalnotice"
                    w="100%"
                    maxW="1200px"
                    mx="auto"
                    px={{base: 4, md: 6}}
                    py={6}
                >
                    <Suspense fallback={regionFallback}>
                        <Region page={page} regionId="legalnotice" />
                    </Suspense>
                </Box>
            ) : null}
        </Box>
    )
}

PageDesignerPage.propTypes = {
    page: PropTypes.shape({
        id: PropTypes.string,
        regions: PropTypes.array,
        pageTitle: PropTypes.string,
        pageDescription: PropTypes.string,
        pageKeywords: PropTypes.string
    }).isRequired
}

export default PageDesignerPage
