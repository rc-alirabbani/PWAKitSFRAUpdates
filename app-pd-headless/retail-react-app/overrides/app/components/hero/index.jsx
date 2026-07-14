/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Box, Heading, Stack, Text} from '@salesforce/retail-react-app/app/components/shared/ui'

/**
 * Full-bleed hero with decorative background via CSS `background-image` (PWA Kit bundle static URLs).
 * Pass `img.src` / `imgMobile.src` from `getAssetUrl('static/images/...')` (same pattern as `static/img/hero.png`).
 */
const Hero = ({banner, title, subtitle, img, imgMobile, actions, className, ...props}) => {
    const desktopSrc = img?.src
    const mobileSrc = imgMobile?.src

    const bgUrl = (url) => (url ? `url("${url.replace(/"/g, '%22')}")` : undefined)

    const backgroundLayerSx = {
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundColor: 'gray.200',
        backgroundImage: bgUrl(desktopSrc),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ...(mobileSrc && mobileSrc !== desktopSrc
            ? {
                  '@media screen and (max-width: 767px)': {
                      backgroundImage: bgUrl(mobileSrc)
                  }
              }
            : {})
    }

    return (
        <Box
            className={['rc-hero', 'rc-hero--overlay', className].filter(Boolean).join(' ')}
            position="relative"
            w="100%"
            minH={{base: '360px', md: '440px', lg: '500px'}}
            overflow="hidden"
            marginBottom={0}
            role="banner"
            aria-label={img?.alt || undefined}
            {...props}
        >
            <Box aria-hidden="true" sx={backgroundLayerSx} />

            <Box
                position="absolute"
                inset={0}
                zIndex={1}
                pointerEvents="none"
                style={{
                    background:
                        'linear-gradient(105deg, rgba(0, 36, 68, 0.92) 0%, rgba(0, 74, 130, 0.78) 38%, rgba(0, 102, 179, 0.45) 65%, rgba(0, 102, 179, 0.2) 100%)'
                }}
            />

            <Stack
                position="relative"
                zIndex={2}
                spacing={{base: 4, md: 6}}
                align="flex-start"
                justify="center"
                minH={{base: '360px', md: '440px', lg: '500px'}}
                maxW="container.xl"
                w="100%"
                mx="auto"
                px={{base: 5, md: 8, lg: 3}}
                py={{base: 10, md: 14, lg: 16}}
            >
                {banner ? (
                    <Text className="rc-hero__banner" maxW="2xl">
                        {banner}
                    </Text>
                ) : null}
                <Heading
                    as="h1"
                    className="rc-hero__title"
                    fontSize={{base: '3xl', md: '4xl', lg: '5xl'}}
                    lineHeight="shorter"
                    maxW={{base: '100%', md: '90%', lg: '60%'}}
                >
                    {title}
                </Heading>
                {subtitle ? (
                    <Box className="rc-hero__subtitle-wrap" maxW={{base: '100%', md: '90%', lg: '58%'}}>
                        {subtitle}
                    </Box>
                ) : null}
                {actions ? <Box width={{base: 'full', sm: 'auto'}}>{actions}</Box> : null}
            </Stack>
        </Box>
    )
}

Hero.displayName = 'Hero'

Hero.propTypes = {
    banner: PropTypes.string,
    img: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string
    }).isRequired,
    imgMobile: PropTypes.shape({
        src: PropTypes.string
    }),
    title: PropTypes.string,
    subtitle: PropTypes.node,
    actions: PropTypes.element,
    className: PropTypes.string
}

export default Hero
