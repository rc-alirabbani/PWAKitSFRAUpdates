/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Image,
    Text,
    Link as ChakraLink
} from '@salesforce/retail-react-app/app/components/shared/ui'
import Link from '@salesforce/retail-react-app/app/components/link'
import {getImageUrl, getMarkupHtml, isAbsoluteURL} from '../../utils'

/**
 * Page Designer `commerce_assets.productListTile` / promotional content tile (same shape as imageAndText).
 */
export const ProductListTile = ({ITCLink, ITCText, image, heading, alt}) => {
    const imageURL = getImageUrl(image)
    const headingHtml = getMarkupHtml(heading)
    const textHtml = getMarkupHtml(ITCText)
    const hasCaption = Boolean(headingHtml || textHtml)
    const imageAlt = alt || image?.alt || image?.title || ''

    if (!imageURL && !hasCaption) return null

    const isAbsolute = isAbsoluteURL(ITCLink)
    const LinkWrapper = isAbsolute ? ChakraLink : Link
    const linkProps = ITCLink
        ? isAbsolute
            ? {href: ITCLink}
            : {to: ITCLink}
        : null

    const content = (
        <Box className="pd-product-list-tile" position="relative" overflow="hidden" borderRadius="lg">
            {imageURL ? (
                <Image
                    src={imageURL}
                    alt={imageAlt}
                    w="100%"
                    loading="lazy"
                    ignoreFallback
                />
            ) : null}
            {hasCaption ? (
                <Box
                    className="pd-product-list-tile__caption"
                    p={4}
                    bg={imageURL ? 'blackAlpha.600' : 'white'}
                    color={imageURL ? 'white' : '#004a82'}
                    position={imageURL ? 'absolute' : 'relative'}
                    bottom={0}
                    left={0}
                    right={0}
                >
                    {headingHtml ? (
                        <Box
                            fontWeight="700"
                            mb={textHtml ? 2 : 0}
                            dangerouslySetInnerHTML={{__html: headingHtml}}
                        />
                    ) : null}
                    {textHtml ? (
                        <Text as="div" fontSize="sm" dangerouslySetInnerHTML={{__html: textHtml}} />
                    ) : null}
                </Box>
            ) : null}
        </Box>
    )

    if (!linkProps) return content

    return (
        <LinkWrapper {...linkProps} display="block" _hover={{textDecoration: 'none'}}>
            {content}
        </LinkWrapper>
    )
}

ProductListTile.displayName = 'ProductListTile'

ProductListTile.propTypes = {
    ITCLink: PropTypes.string,
    ITCText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    heading: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    alt: PropTypes.string
}

export default ProductListTile
