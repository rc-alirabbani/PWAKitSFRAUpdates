// app/pages/page-viewer/index.jsx
import React, {useMemo} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import {Box, Skeleton} from '@salesforce/retail-react-app/app/components/shared/ui'
import {
    useAccessToken,
    useCommerceApi,
    useConfig
} from '@salesforce/commerce-sdk-react'
import {Page} from '@salesforce/commerce-sdk-react/page-designer'
import {HTTPError, HTTPNotFound} from '@salesforce/pwa-kit-react-sdk/ssr/universal/errors'

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
            const token = await getTokenWhenReady()
            const parameters = {
                pageId,
                organizationId,
                siteId,
                ...(config.locale ? {locale: config.locale} : {}),
                ...(mode ? {mode} : {}),
                ...(pdToken ? {pdToken} : {})
            }
            const response = await client.getPage(
                {
                    parameters,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                },
                true
            )
            return response.json()
        }
    })

    if (error) {
        const status = error.status ?? error.response?.status
        const ErrorClass = status === 404 ? HTTPNotFound : HTTPError
        throw new ErrorClass(error.message || error.response?.statusText || 'Page load failed')
    }

    if (isLoading || page == null) {
        return (
            <Box layerStyle={'page'} p={4}>
                <Skeleton height="40vh" width="100%" />
            </Box>
        )
    }

    return (
        <Box layerStyle={'page'}>
            <Page page={page} />
        </Box>
    )
}

export default PageViewer
