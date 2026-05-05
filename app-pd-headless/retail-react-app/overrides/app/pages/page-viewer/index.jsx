// app/pages/page-viewer/index.jsx
import React, {Suspense, useEffect, useMemo, useState} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Skeleton,
    Text
} from '@salesforce/retail-react-app/app/components/shared/ui'
import {
    useAccessToken,
    useCommerceApi,
    useConfig
} from '@salesforce/commerce-sdk-react'
import {Page} from '@salesforce/commerce-sdk-react/page-designer'
import {HTTPError, HTTPNotFound} from '@salesforce/pwa-kit-react-sdk/ssr/universal/errors'

// import {preloadPageDesignerChunks} from '../../page-designer/registry'

const LOG = '[page-viewer]'

function redactSearchString(search) {
    if (!search) return ''
    const u = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
    if (u.has('pdToken')) u.set('pdToken', '(redacted)')
    return u.toString()
}

function withTimeout(promise, ms, message) {
    return Promise.race([
        promise,
        new Promise((_, reject) => {
            setTimeout(() => reject(new Error(message)), ms)
        })
    ])
}

/**
 * Loads Page Designer JSON with getPage(rawResponse: true).
 * usePage() only does that when mode/pdToken are set; the default DTO omits the component tree,
 * which produces an empty storefront page on routes like /page/:pageId.
 */
const PageViewer = () => {
    const {pageId: pageIdFromRoute} = useParams()
    const {search} = useLocation()
    const config = useConfig()
    const client = useCommerceApi('shopperExperience')
    const {getTokenWhenReady} = useAccessToken()

    const providerPd = config.pageDesignerParams || {}
    const qs = useMemo(() => new URLSearchParams(search), [search])

    const mode = qs.get('mode') || providerPd.mode || undefined
    const pdToken = qs.get('pdToken') || providerPd.pdToken || undefined
    const pageIdFromQuery = qs.get('pageId') || providerPd.pageId || undefined
    const pageId = pageIdFromQuery || pageIdFromRoute

    const organizationId = config.organizationId
    const siteId = config.siteId
    const isPageDesignerContext = Boolean(mode || pdToken)

    const [showSlowHint, setShowSlowHint] = useState(false)

    const {data: page, error, isLoading} = useQuery({
        queryKey: [
            'shopperExperience',
            'getPage',
            'raw',
            organizationId,
            siteId,
            pageId,
            mode,
            pdToken,
            config.locale
        ],
        enabled: Boolean(pageId && organizationId && siteId),
        queryFn: async () => {
            if (typeof window !== 'undefined' && isPageDesignerContext) {
                // eslint-disable-next-line no-console
                console.info(LOG, 'ShopperExperience getPage starting', {
                    pageId,
                    siteId,
                    organizationId,
                    mode: mode || undefined,
                    query: redactSearchString(search)
                })
            }

            const token = await withTimeout(
                getTokenWhenReady(),
                30000,
                'SLAS token not ready within 30s. In a BM Page Designer iframe, guest auth often needs the parent origin trusted for SameSite=None cookies — check Network for /oauth2/token failures.'
            )

            const parameters = {
                pageId,
                organizationId,
                siteId,
                ...(config.locale ? {locale: config.locale} : {}),
                ...(mode ? {mode} : {}),
                ...(pdToken ? {pdToken} : {})
            }

            const response = await withTimeout(
                client.getPage(
                    {
                        parameters,
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    },
                    true
                ),
                45000,
                'ShopperExperience getPage request timed out after 45s.'
            )

            if (!response.ok) {
                let bodyText = ''
                try {
                    bodyText = await response.text()
                } catch {
                    bodyText = ''
                }
                const preview = bodyText.slice(0, 800)
                // eslint-disable-next-line no-console
                console.error(LOG, 'getPage HTTP error', {
                    status: response.status,
                    statusText: response.statusText,
                    pageId,
                    siteId,
                    bodyPreview: preview
                })
                const err = new Error(
                    `ShopperExperience getPage ${response.status} ${response.statusText}: ${preview}`
                )
                err.status = response.status
                err.response = {status: response.status, statusText: response.statusText, body: bodyText}
                throw err
            }

            const json = await response.json()

            // // Warm lazy PD chunks before first paint of <Page /> (client only; reduces iframe waterfall).
            // if (typeof window !== 'undefined') {
            //     try {
            //         await preloadPageDesignerChunks(json)
            //     } catch {
            //         /* best-effort */
            //     }
            // }

            if (typeof window !== 'undefined' && isPageDesignerContext) {
                // eslint-disable-next-line no-console
                console.info(LOG, 'getPage OK', {pageId, regionCount: json?.regions?.length})
            }
            return json
        }
    })

    useEffect(() => {
        if (!isLoading || !isPageDesignerContext) {
            setShowSlowHint(false)
            return undefined
        }
        const t = window.setTimeout(() => setShowSlowHint(true), 12000)
        return () => window.clearTimeout(t)
    }, [isLoading, isPageDesignerContext])

    if (error) {
        const status = error.status ?? error.response?.status
        const bodySnippet = (error.response?.body || '').slice(0, 600)

        // eslint-disable-next-line no-console
        console.error(LOG, 'page load error', {
            status: status ?? 'unknown',
            message: error.message,
            bodySnippet: bodySnippet || undefined,
            pageId,
            siteId
        })

        if (isPageDesignerContext) {
            return (
                <Box layerStyle={'page'} p={4}>
                    <Alert status="error" variant="subtle" flexDirection="column" alignItems="stretch">
                        <Box display="flex" gap={2}>
                            <AlertIcon />
                            <Box flex={1}>
                                <AlertTitle>Page Designer preview failed</AlertTitle>
                                <AlertDescription mt={2}>
                                    <Text fontWeight="semibold">
                                        HTTP {status ?? 'error'} — check DevTools → Network for
                                        shopperExperience getPage (and SLAS token) not only the top document 200.
                                    </Text>
                                    <Text mt={2} fontSize="sm" whiteSpace="pre-wrap" fontFamily="mono">
                                        {error.message}
                                    </Text>
                                    {bodySnippet ? (
                                        <Text mt={2} fontSize="xs" whiteSpace="pre-wrap" fontFamily="mono">
                                            {bodySnippet}
                                        </Text>
                                    ) : null}
                                </AlertDescription>
                            </Box>
                        </Box>
                    </Alert>
                </Box>
            )
        }

        const ErrorClass = status === 404 ? HTTPNotFound : HTTPError
        throw new ErrorClass(error.message || error.response?.statusText || 'Page load failed')
    }

    if (isLoading || page == null) {
        return (
            <Box layerStyle={'page'} p={4} minHeight="50vh">
                <Text fontSize="sm" color="gray.600" mb={3}>
                    Loading Page Designer content…
                </Text>
                <Skeleton height="40vh" width="100%" />
                {showSlowHint && isPageDesignerContext ? (
                    <Alert status="warning" mt={4}>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Still loading</AlertTitle>
                            <AlertDescription fontSize="sm">
                                Open Network, filter by &quot;experience&quot; or &quot;oauth2&quot;. A hung
                                preview is usually a failed getPage or token call while the HTML document still
                                returns 200.
                            </AlertDescription>
                        </Box>
                    </Alert>
                ) : null}
            </Box>
        )
    }

    return (
        <Box layerStyle={'page'}>
            <Suspense
                fallback={
                    <Box p={4} minHeight="40vh">
                        <Text fontSize="sm" color="gray.600" mb={3}>
                            Rendering page layout…
                        </Text>
                        <Skeleton height="40vh" width="100%" />
                    </Box>
                }
            >
                <Page page={page} />
            </Suspense>
        </Box>
    )
}

export default PageViewer
