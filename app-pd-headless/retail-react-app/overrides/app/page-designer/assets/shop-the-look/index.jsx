/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Image, Skeleton, Text} from '@salesforce/retail-react-app/app/components/shared/ui'
import Link from '@salesforce/retail-react-app/app/components/link'
import {useProduct} from '@salesforce/commerce-sdk-react'
import {useIntl} from 'react-intl'
import {resolveProductId, productHref, getImageUrl} from '../../utils'

/**
 * Page Designer `commerce_assets.shopTheLook` — large product look tile.
 */
export const ShopTheLook = ({product, priceDisplay = false}) => {
    const productId = resolveProductId(product)
    const intl = useIntl()
    const {data, isLoading, error} = useProduct(
        {
            parameters: {
                id: productId,
                allImages: true
            }
        },
        {enabled: Boolean(productId)}
    )

    if (!productId) return null
    if (isLoading) {
        return <Skeleton className="pd-shop-the-look" height="320px" borderRadius="lg" />
    }
    if (error || !data) return null

    const imageURL =
        getImageUrl(data?.imageGroups?.[0]?.images?.[0]) ||
        data?.imageGroups?.[0]?.images?.[0]?.disBaseLink ||
        data?.imageGroups?.[0]?.images?.[0]?.link

    const price = data?.price ?? data?.pricePerUnit
    const currency = data?.currency || 'USD'

    return (
        <Link to={productHref(productId)} className="pd-shop-the-look">
            <Box
                position="relative"
                borderRadius="lg"
                overflow="hidden"
                borderWidth="1px"
                borderColor="gray.200"
                bg="white"
                _hover={{boxShadow: 'md', borderColor: 'blue.200'}}
                transition="all 0.2s"
            >
                {imageURL ? (
                    <Image src={imageURL} alt={data.name || ''} w="100%" objectFit="cover" loading="lazy" />
                ) : (
                    <Box h="240px" bg="gray.100" />
                )}
                <Box p={3}>
                    <Text fontWeight="700" color="#004a82" fontSize="sm" noOfLines={2}>
                        {data.name}
                    </Text>
                    {priceDisplay && price != null ? (
                        <Text mt={1} fontSize="sm" color="gray.700">
                            {intl.formatNumber(price, {style: 'currency', currency})}
                        </Text>
                    ) : null}
                </Box>
            </Box>
        </Link>
    )
}

ShopTheLook.displayName = 'ShopTheLook'

ShopTheLook.propTypes = {
    product: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    priceDisplay: PropTypes.bool
}

export default ShopTheLook
