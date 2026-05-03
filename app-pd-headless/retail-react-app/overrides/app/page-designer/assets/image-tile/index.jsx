/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Image} from '@salesforce/retail-react-app/app/components/shared/ui'

/**
 * Resolve a usable image URL from Shopper Experience / Page Designer payloads (shape varies by BM).
 */
function getImageUrl(resolved) {
    if (!resolved) return null
    if (typeof resolved === 'string') return resolved

    const src = resolved.src
    const fromSrc =
        (typeof src === 'string' && src) ||
        src?.mobile ||
        src?.tablet ||
        src?.desktop ||
        src?.url

    return (
        fromSrc ||
        resolved.url ||
        resolved.disBaseLink ||
        resolved.absURL ||
        resolved.absoluteURL ||
        resolved.link ||
        resolved.path ||
        null
    )
}

/**
 * Page Designer passes props from `component.data`; attribute ids in BM become keys (e.g. `image`, `media`).
 */
export const ImageTile = ({image, media, ...rest}) => {
    const resolved = image ?? media ?? rest.image ?? rest.media
    const imageURL = getImageUrl(resolved)

    if (!imageURL) {
        return null
    }

    const alt = resolved?.alt ?? resolved?.title ?? ''

    return (
        <Box className={'image-tile'}>
            <figure className={'image-tile-figure'}>
                <picture>
                    <source srcSet={resolved?.src?.tablet} media="(min-width: 48em)" />
                    <source srcSet={resolved?.src?.desktop} media="(min-width: 64em)" />
                    <Image
                        className={'image-tile-image'}
                        data-testid={'image-tile-image'}
                        src={imageURL}
                        ignoreFallback={true}
                        alt={alt}
                        title={alt}
                        loading="lazy"
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
