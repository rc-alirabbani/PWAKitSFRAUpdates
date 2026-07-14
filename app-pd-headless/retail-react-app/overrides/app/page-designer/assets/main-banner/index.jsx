/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Button, Text} from '@salesforce/retail-react-app/app/components/shared/ui'
import Link from '@salesforce/retail-react-app/app/components/link'
import {getImageUrl, getMarkupHtml, resolveCategoryId, categoryHref} from '../../utils'

/**
 * Page Designer `commerce_assets.mainBanner` — matches Royal Cyber overlay hero design.
 */
export const MainBanner = ({image, heading, categoryLink}) => {
    const imageURL = getImageUrl(image)
    const headingHtml = getMarkupHtml(heading)
    const categoryId = resolveCategoryId(categoryLink)
    const href = categoryId ? categoryHref(categoryId) : '/'
    const alt = image?.alt || image?.title || ''

    if (!imageURL && !headingHtml) return null

    return (
        <Box className="rc-home-top" mb={0}>
            <Box
                className="pd-main-banner rc-hero rc-hero--overlay"
                position="relative"
                w="100%"
                minH={{base: '360px', md: '440px', lg: '500px'}}
                overflow="hidden"
                role="banner"
                aria-label={alt || undefined}
            >
                {imageURL ? (
                    <Box
                        aria-hidden="true"
                        position="absolute"
                        inset={0}
                        zIndex={0}
                        backgroundColor="gray.200"
                        backgroundImage={`url("${String(imageURL).replace(/"/g, '%22')}")`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                    />
                ) : null}

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

                <Box
                    position="relative"
                    zIndex={2}
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    justifyContent="center"
                    gap={{base: 4, md: 5}}
                    minH={{base: '360px', md: '440px', lg: '500px'}}
                    maxW="container.xl"
                    w="100%"
                    mx="auto"
                    px={{base: 5, md: 8, lg: 10}}
                    py={{base: 10, md: 14, lg: 16}}
                >
                    {headingHtml ? (
                        <Box
                            className="pd-main-banner__heading"
                            maxW={{base: '100%', md: '90%', lg: '58%'}}
                            dangerouslySetInnerHTML={{__html: headingHtml}}
                        />
                    ) : (
                        <>
                            <Text className="rc-hero__banner" maxW="2xl">
                                Salesforce Commerce Cloud · Composable Storefront
                            </Text>
                            <Text
                                as="h1"
                                className="rc-hero__title"
                                fontSize={{base: '3xl', md: '4xl', lg: '5xl'}}
                                fontWeight="700"
                                lineHeight="shorter"
                                color="white"
                            >
                                Progressive Web App for modern commerce
                            </Text>
                        </>
                    )}

                    <Button
                        as={Link}
                        to={href}
                        className="rc-hero__cta"
                        size="lg"
                        colorScheme="orange"
                        _hover={{textDecoration: 'none'}}
                    >
                        Shop
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

MainBanner.displayName = 'MainBanner'

MainBanner.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    heading: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    categoryLink: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default MainBanner
