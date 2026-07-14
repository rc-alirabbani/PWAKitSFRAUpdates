/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Heading,
    Image,
    Skeleton,
    Text,
    Button,
    Stack
} from '@salesforce/retail-react-app/app/components/shared/ui'
import {useParams} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {Region, regionPropType, componentPropType} from '@salesforce/commerce-sdk-react/page-designer'
import {useProduct} from '@salesforce/commerce-sdk-react'
import Link from '@salesforce/retail-react-app/app/components/link'
import {resolveProductId, getImageUrl, productHref} from '../../utils'

/**
 * Page Designer `dynamic.productDetail` — compact PDP summary + optional child regions.
 * Full interactive PDP remains available at `/product/:productId`.
 */
export const DynamicProductDetail = ({productId, regions = [], component}) => {
    const params = useParams()
    const intl = useIntl()
    const id = resolveProductId(productId) || params.productId

    const {data, isLoading, error} = useProduct(
        {
            parameters: {id, allImages: true}
        },
        {enabled: Boolean(id)}
    )

    const imageURL = getImageUrl(data?.imageGroups?.[0]?.images?.[0])
    const price = data?.price
    const currency = data?.currency || 'USD'

    return (
        <Box className="pd-dynamic-product-detail" maxW="1200px" mx="auto" px={4} py={6}>
            {!id ? (
                <Text color="gray.600">No product selected for this detail layout.</Text>
            ) : isLoading ? (
                <Skeleton height="420px" borderRadius="lg" />
            ) : error || !data ? (
                <Text color="red.500">Unable to load product.</Text>
            ) : (
                <Stack direction={{base: 'column', md: 'row'}} spacing={8} align="flex-start">
                    <Box flex="1" borderRadius="lg" overflow="hidden" bg="gray.50">
                        {imageURL ? (
                            <Image src={imageURL} alt={data.name || ''} w="100%" />
                        ) : (
                            <Skeleton height="360px" />
                        )}
                    </Box>
                    <Stack flex="1" spacing={4}>
                        <Heading as="h1" size="xl" color="#004a82">
                            {data.name}
                        </Heading>
                        {price != null ? (
                            <Text fontSize="xl" fontWeight="700">
                                {intl.formatNumber(price, {style: 'currency', currency})}
                            </Text>
                        ) : null}
                        {data.shortDescription ? (
                            <Box
                                color="gray.700"
                                dangerouslySetInnerHTML={{__html: data.shortDescription}}
                            />
                        ) : null}
                        <Button as={Link} to={productHref(id)} colorScheme="orange" alignSelf="flex-start">
                            View full product details
                        </Button>
                    </Stack>
                </Stack>
            )}

            {regions?.length
                ? regions.map((region) =>
                      component ? (
                          <Box key={region.id} mt={8}>
                              <Region component={component} regionId={region.id} />
                          </Box>
                      ) : null
                  )
                : null}
        </Box>
    )
}

DynamicProductDetail.displayName = 'DynamicProductDetail'

DynamicProductDetail.propTypes = {
    productId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    regions: PropTypes.arrayOf(regionPropType),
    component: componentPropType
}

export default DynamicProductDetail
