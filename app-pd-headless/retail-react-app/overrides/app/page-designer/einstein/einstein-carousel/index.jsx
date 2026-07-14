/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React, {useEffect, useMemo, useState} from 'react'
import PropTypes from 'prop-types'
import {Box, Heading, Skeleton} from '@salesforce/retail-react-app/app/components/shared/ui'
import {useProducts} from '@salesforce/commerce-sdk-react'
import ProductScroller from '@salesforce/retail-react-app/app/components/product-scroller'
import useEinstein from '@salesforce/retail-react-app/app/hooks/use-einstein'
import {resolveCategoryId, resolveProductId} from '../../utils'

/**
 * Shared Einstein / reco carousel used by:
 * - einstein.einsteinCarousel
 * - einstein.einsteinCarouselCategory
 * - einstein.einsteinCarouselProduct
 *
 * Uses Einstein recommendations when available; otherwise falls back to products from `ids` / empty state.
 */
export const EinsteinCarousel = ({
    textHeadline,
    recommender,
    count = '4',
    displayRatings = false,
    category,
    product,
    xsCarouselSlidesToDisplay = 1,
    smCarouselSlidesToDisplay = 2,
    mdCarouselSlidesToDisplay = 4
}) => {
    const einstein = useEinstein()
    const [recoIds, setRecoIds] = useState([])
    const [isRecoLoading, setIsRecoLoading] = useState(true)

    const categoryId = resolveCategoryId(category)
    const productId = resolveProductId(product)
    const limit = Math.min(Number(count) || 4, 12)

    const recommenderName =
        (typeof recommender === 'string' && recommender) ||
        recommender?.name ||
        recommender?.recommenderName ||
        recommender?.id ||
        null

    useEffect(() => {
        let cancelled = false

        async function loadRecos() {
            setIsRecoLoading(true)
            try {
                if (!einstein || !recommenderName) {
                    if (!cancelled) setRecoIds([])
                    return
                }

                const args = {recommenderName}
                if (productId) args.products = [{id: productId}]
                if (categoryId) args.categories = [{id: categoryId}]

                // useEinstein exposes sendViewReco / getRecommendations depending on kit version
                let recs = null
                if (typeof einstein.getRecommendations === 'function') {
                    recs = await einstein.getRecommendations(recommenderName, {
                        products: productId ? [{id: productId}] : undefined,
                        categories: categoryId ? [{id: categoryId}] : undefined
                    })
                } else if (typeof einstein.sendViewReco === 'function') {
                    // Best-effort: trigger view; products still need a separate fetch path
                    await einstein.sendViewReco(args, [])
                }

                const ids =
                    recs?.recs?.map((r) => r.id || r.productId).filter(Boolean) ||
                    recs?.recommendations?.map((r) => r.id || r.product_id).filter(Boolean) ||
                    []

                if (!cancelled) setRecoIds(ids.slice(0, limit))
            } catch {
                if (!cancelled) setRecoIds([])
            } finally {
                if (!cancelled) setIsRecoLoading(false)
            }
        }

        loadRecos()
        return () => {
            cancelled = true
        }
    }, [einstein, recommenderName, productId, categoryId, limit])

    const ids = useMemo(() => recoIds.filter(Boolean), [recoIds])

    const {data: productsData, isLoading: productsLoading} = useProducts(
        {
            parameters: {
                ids: ids,
                allImages: true
            }
        },
        {enabled: ids.length > 0}
    )

    const products = useMemo(() => {
        if (!productsData) return []
        // useProducts may return {data: [...]} or array depending on SDK version
        const list = Array.isArray(productsData) ? productsData : productsData.data || []
        return list
    }, [productsData])

    const isLoading = isRecoLoading || (ids.length > 0 && productsLoading)

    if (isLoading) {
        return (
            <Box className="pd-einstein-carousel" py={6} maxW="1200px" mx="auto" px={4}>
                {textHeadline ? (
                    <Heading as="h2" size="lg" textAlign="center" color="#004a82" mb={4}>
                        {textHeadline}
                    </Heading>
                ) : null}
                <Skeleton height="280px" borderRadius="md" />
            </Box>
        )
    }

    if (!products.length) {
        return textHeadline ? (
            <Box className="pd-einstein-carousel" py={4} maxW="1200px" mx="auto" px={4}>
                <Heading as="h2" size="lg" textAlign="center" color="#004a82" mb={2}>
                    {textHeadline}
                </Heading>
            </Box>
        ) : null
    }

    return (
        <Box className="pd-einstein-carousel rc-home-products" py={6} px={4}>
            <ProductScroller
                title={textHeadline}
                products={products}
            />
        </Box>
    )
}

EinsteinCarousel.displayName = 'EinsteinCarousel'

EinsteinCarousel.propTypes = {
    textHeadline: PropTypes.string,
    recommender: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    displayRatings: PropTypes.bool,
    category: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    product: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    xsCarouselSlidesToDisplay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    smCarouselSlidesToDisplay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mdCarouselSlidesToDisplay: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default EinsteinCarousel
