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
 * Page Designer `commerce_assets.imageAndText` — styled to match Royal Cyber category / promo tiles.
 */
export const ImageWithText = ({ITCLink, ITCText, image, heading, alt}) => {
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

    const tile = (
        <Box
            className="pd-image-with-text rc-category-strip__tile"
            display="block"
            position="relative"
            borderRadius="10px"
            overflow="hidden"
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            transition="transform 0.2s ease, box-shadow 0.2s ease"
            _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 24px rgba(0, 74, 130, 0.12)'
            }}
        >
            {imageURL ? (
                <figure className="image-with-text-figure" style={{margin: 0}}>
                    <picture>
                        <source srcSet={image?.src?.tablet} media="(min-width: 48em)" />
                        <source srcSet={image?.src?.desktop} media="(min-width: 64em)" />
                        <Image
                            className="image-with-text-image"
                            src={imageURL}
                            alt={imageAlt}
                            ignoreFallback
                            loading="lazy"
                            w="100%"
                            h="100%"
                            sx={{
                                aspectRatio: '1 / 1',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                display: 'block'
                            }}
                        />
                    </picture>
                </figure>
            ) : null}

            {headingHtml ? (
                <Box
                    className="image-with-text-heading-overlay"
                    position="absolute"
                    inset={0}
                    display="flex"
                    alignItems="flex-end"
                    p={4}
                    pointerEvents="none"
                    style={{
                        background:
                            'linear-gradient(180deg, transparent 40%, rgba(0,36,68,0.75) 100%)'
                    }}
                >
                    <Box
                        color="white"
                        fontWeight="700"
                        dangerouslySetInnerHTML={{__html: headingHtml}}
                    />
                </Box>
            ) : null}

            {textHtml ? (
                <Text
                    as="div"
                    className="image-with-text-caption"
                    px={2}
                    py={3}
                    textAlign="center"
                    fontWeight="600"
                    fontSize="0.95rem"
                    color="#004a82"
                    dangerouslySetInnerHTML={{__html: textHtml}}
                />
            ) : null}
        </Box>
    )

    if (!linkProps) return tile

    return (
        <LinkWrapper {...linkProps} className="pd-image-with-text-link" _hover={{textDecoration: 'none'}}>
            {tile}
        </LinkWrapper>
    )
}

ImageWithText.displayName = 'ImageWithText'

ImageWithText.propTypes = {
    ITCLink: PropTypes.string,
    ITCText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    heading: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    alt: PropTypes.string
}

export default ImageWithText
