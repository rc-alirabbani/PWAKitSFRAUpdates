/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React, {Suspense, useMemo} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'

import {Box, Skeleton} from '@salesforce/retail-react-app/app/components/shared/ui'

import {
    useAccessToken,
    useCommerceApi,
    useConfig
} from '@salesforce/commerce-sdk-react'

import PageDesignerPage from '../../page-designer/page'

import {
    HTTPError,
    HTTPNotFound
} from '@salesforce/pwa-kit-react-sdk/ssr/universal/errors'

const withTimeout = (promise, ms, message) =>
    Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms))
    ])

/**
 * Renders a Page Designer page from Shopper Experience `getPage`.
 * Uses a custom page shell (not SDK `<Page>`) so full-bleed banners match BM authoring intent.
 */
const PageViewer = () => {
    const {pageId: routePageId} = useParams()
    const {search} = useLocation()

    const config = useConfig()
    const client = useCommerceApi('shopperExperience')
    const {getTokenWhenReady} = useAccessToken()

    const query = useMemo(() => new URLSearchParams(search), [search])

    const mode = query.get('mode')
    const pdToken = query.get('pdToken')
    const pageId = query.get('pageId') || routePageId

    const {data: page, error, isLoading} = useQuery({
        queryKey: ['shopperExperience', 'getPage', pageId, mode, pdToken, config.locale],

        enabled: Boolean(pageId && config.organizationId && config.siteId),

        queryFn: async () => {
            const token = await withTimeout(
                getTokenWhenReady(),
                30000,
                'Unable to retrieve SLAS token.'
            )

            const response = await withTimeout(
                client.getPage(
                    {
                        parameters: {
                            organizationId: config.organizationId,
                            siteId: config.siteId,
                            pageId,
                            ...(config.locale && {locale: config.locale}),
                            ...(mode && {mode}),
                            ...(pdToken && {pdToken})
                        },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    },
                    true
                ),
                45000,
                'Page request timed out.'
            )

            if (!response.ok) {
                const body = await response.text()
                const err = new Error(`Failed to load page (${response.status})`)
                err.status = response.status
                err.response = {status: response.status, body}
                throw err
            }

            return response.json()
        }
    })

    if (error) {
        const status = error.status ?? error.response?.status
        if (status === 404) {
            throw new HTTPNotFound('Page not found')
        }
        throw new HTTPError(error.message || 'Unable to load Page Designer page.')
    }

    if (isLoading || !page) {
        return (
            <Box className="pd-page-viewer" p={4}>
                <Skeleton height="600px" />
            </Box>
        )
    }

    // Helpful during demos: log component tree once so BM vs React gaps are easy to spot
    if (typeof window !== 'undefined' && !window.__PD_PAGE_LOGGED__) {
        window.__PD_PAGE_LOGGED__ = true
        const summarize = (regions = []) =>
            regions.map((r) => ({
                region: r.id,
                components: (r.components || []).map((c) => ({
                    typeId: c.typeId,
                    id: c.id,
                    dataKeys: c.data ? Object.keys(c.data) : []
                }))
            }))
        // eslint-disable-next-line no-console
        console.info('[Page Designer]', pageId, summarize(page.regions))
    }

    return (
        <Box className="pd-page-viewer rc-theme-hook" w="100%" maxW="100%">
            <Suspense
                fallback={
                    <Box p={4}>
                        <Skeleton height="600px" />
                    </Box>
                }
            >
                <PageDesignerPage page={page} />
            </Suspense>
        </Box>
    )
}

export default PageViewer
