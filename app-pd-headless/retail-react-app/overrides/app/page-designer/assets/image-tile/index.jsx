/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Image} from '@salesforce/retail-react-app/app/components/shared/ui'
import {getImageUrl} from '../../utils'

/**
 * Page Designer `commerce_assets.photoTile` / `imageTile`.
 */
export const ImageTile = ({image, media, ...rest}) => {
    const resolved = image ?? media ?? rest.image ?? rest.media
    const imageURL = getImageUrl(resolved)

    if (!imageURL) {
        return null
    }

    const alt = resolved?.alt ?? resolved?.title ?? ''

    return (
        <Box
            className="image-tile pd-image-tile"
            overflow="hidden"
            borderRadius="xl"
            w="100%"
            h="100%"
            minH={{base: '220px', md: '320px'}}
            bg="gray.100"
        >
            <figure className="image-tile-figure" style={{margin: 0, height: '100%'}}>
                <picture style={{display: 'block', height: '100%'}}>
                    <source srcSet={resolved?.src?.tablet} media="(min-width: 48em)" />
                    <source srcSet={resolved?.src?.desktop} media="(min-width: 64em)" />
                    <Image
                        className="image-tile-image"
                        data-testid="image-tile-image"
                        src={imageURL}
                        ignoreFallback={true}
                        alt={alt}
                        title={alt}
                        loading="lazy"
                        w="100%"
                        h="100%"
                        minH={{base: '220px', md: '320px'}}
                        display="block"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </picture>
            </figure>
        </Box>
    )
}

ImageTile.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    media: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}

export default ImageTile
