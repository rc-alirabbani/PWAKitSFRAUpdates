/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useEffect} from 'react'
import {useIntl, FormattedMessage} from 'react-intl'
import {useLocation} from 'react-router-dom'

import {Box, Button, Stack, Link, Text} from '@salesforce/retail-react-app/app/components/shared/ui'

import Hero from '../../components/hero'
import Seo from '@salesforce/retail-react-app/app/components/seo'
import Section from '@salesforce/retail-react-app/app/components/section'
import ProductScroller from '@salesforce/retail-react-app/app/components/product-scroller'

import {getAssetUrl} from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'
import useEinstein from '@salesforce/retail-react-app/app/hooks/use-einstein'

import {
    CUSTOM_HOME_BANNER,
    CUSTOM_HOME_TITLE,
    HOME_CATEGORY_TILES,
    HOME_HERO_IMAGE_DESKTOP,
    HOME_HERO_IMAGE_MOBILE,
    HOME_PRODUCT_TILE_IMAGE_WIDTHS,
    HOME_SHOP_PRODUCTS_CATEGORY_ID,
    HOME_SHOP_PRODUCTS_LIMIT,
    MAX_CACHE_AGE,
    STALE_WHILE_REVALIDATE
} from '../../constants'

import {useServerContext} from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'
import {useProductSearch} from '@salesforce/commerce-sdk-react'

/**
 * Royal Cyber home — hero overlay, category strip, and product scroller.
 */
const Home = () => {
    const intl = useIntl()
    const einstein = useEinstein()
    const {pathname} = useLocation()

    const {res} = useServerContext()
    if (res) {
        res.set(
            'Cache-Control',
            `s-maxage=${MAX_CACHE_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`
        )
    }

    const {data: productSearchResult, isLoading} = useProductSearch({
        parameters: {
            refine: [`cgid=${HOME_SHOP_PRODUCTS_CATEGORY_ID}`, 'htype=master'],
            expand: ['promotions', 'variations', 'prices', 'images', 'custom_properties'],
            perPricebook: true,
            allVariationProperties: true,
            limit: HOME_SHOP_PRODUCTS_LIMIT
        }
    })

    useEffect(() => {
        einstein.sendViewPage(pathname)
    }, [])

    return (
        <Box data-testid="home-page" className="rc-theme-hook" width="100%">
            <Seo
                title="Home Page"
                description="Commerce Cloud Retail React App"
                keywords="Commerce Cloud, Retail React App, React Storefront"
            />

            <Box className="rc-home-hero-bleed">
                <Box className="rc-home-top">
                    <Hero
                        banner={CUSTOM_HOME_BANNER}
                        title={CUSTOM_HOME_TITLE}
                        subtitle={
                            <>
                                <Text as="p" className="rc-hero__bridge-intro" mb={3}>
                                    <FormattedMessage
                                        id="home.hero.bridge_intro"
                                        defaultMessage="Fresh looks across fashion, jewelry, and lifestyle"
                                    />
                                </Text>
                                <Text as="p" className="rc-hero__subtitle">
                                    {intl.formatMessage({
                                        defaultMessage:
                                            'Explore curated collections built for everyday moments — from elevated essentials to statement pieces that stand out.',
                                        id: 'home.hero.subtitle'
                                    })}
                                </Text>
                            </>
                        }
                        img={{
                            src: getAssetUrl(HOME_HERO_IMAGE_DESKTOP),
                            alt: intl.formatMessage({
                                defaultMessage: 'Hero image',
                                id: 'home.hero.img_alt_desktop'
                            })
                        }}
                        imgMobile={{
                            src: getAssetUrl(HOME_HERO_IMAGE_MOBILE)
                        }}
                        actions={
                            <Stack
                                spacing={{base: 4, sm: 6}}
                                direction={{base: 'column', sm: 'row'}}
                            >
                                <Button
                                    as={Link}
                                    href="/category/womens"
                                    className="rc-hero__cta"
                                    size="lg"
                                    width={{base: 'full', md: 'inherit'}}
                                    _hover={{textDecoration: 'none'}}
                                >
                                    <FormattedMessage
                                        defaultMessage="Shop Collections"
                                        id="home.link.shop_collections"
                                    />
                                </Button>
                            </Stack>
                        }
                    />
                </Box>
            </Box>

            <Box className="rc-category-strip-bleed">
                <Box className="rc-category-strip" py={8}>
                    <Text as="h2" className="rc-category-strip__heading">
                        <FormattedMessage
                            defaultMessage="Shop by category"
                            id="home.category_strip.heading"
                        />
                    </Text>
                    <Box className="rc-category-strip__grid">
                        {HOME_CATEGORY_TILES.map((tile) => (
                            <Link
                                key={tile.label}
                                href={tile.href}
                                className="rc-category-strip__tile"
                                _hover={{textDecoration: 'none'}}
                            >
                                <img
                                    src={getAssetUrl(tile.image)}
                                    alt={tile.label}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <span>{tile.label}</span>
                            </Link>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Box className="rc-page-gutter" layerStyle="page">
                {productSearchResult && (
                    <Section
                        className="rc-shop-section"
                        padding={4}
                        paddingTop={16}
                        title={intl.formatMessage({
                            defaultMessage: 'Shop Products',
                            id: 'home.heading.shop_products'
                        })}
                        subtitle={intl.formatMessage(
                            {
                                defaultMessage:
                                    'This section contains content from the catalog. {docLink} on how to replace it.',
                                id: 'home.description.shop_products',
                                description:
                                    '{docLink} is a html button that links the user to https://sfdc.co/business-manager-manage-catalogs'
                            },
                            {
                                docLink: (
                                    <Link
                                        target="_blank"
                                        href={'https://sfdc.co/business-manager-manage-catalogs'}
                                        textDecoration={'none'}
                                        position={'relative'}
                                        _after={{
                                            position: 'absolute',
                                            content: `""`,
                                            height: '2px',
                                            bottom: '-2px',
                                            margin: '0 auto',
                                            left: 0,
                                            right: 0,
                                            background: 'gray.700'
                                        }}
                                        _hover={{textDecoration: 'none'}}
                                    >
                                        {intl.formatMessage({
                                            defaultMessage: 'Read docs',
                                            id: 'home.link.read_docs'
                                        })}
                                    </Link>
                                )
                            }
                        )}
                    >
                        <Stack pt={8} spacing={16}>
                            <Box className="rc-home-products">
                                <ProductScroller
                                    products={productSearchResult?.hits}
                                    isLoading={isLoading}
                                    itemWidth={{
                                        base: '56%',
                                        sm: '50%',
                                        md: '34%',
                                        lg: 'calc(22% - 0.65rem)'
                                    }}
                                    scrollProps={{
                                        sx: {
                                            pb: 1,
                                            scrollSnapType: 'x mandatory',
                                            scrollbarWidth: 'none',
                                            msOverflowStyle: 'none',
                                            '&::-webkit-scrollbar': {
                                                display: 'none',
                                                width: 0,
                                                height: 0
                                            }
                                        }
                                    }}
                                    productTileProps={(product) => ({
                                        dynamicImageProps: {
                                            widths: HOME_PRODUCT_TILE_IMAGE_WIDTHS,
                                            imageProps: {
                                                style: {objectFit: 'cover'}
                                            }
                                        },
                                        'aria-label':
                                            product?.productName || product?.name || undefined
                                    })}
                                />
                            </Box>
                        </Stack>
                    </Section>
                )}
            </Box>
        </Box>
    )
}

Home.getTemplateName = () => 'home'

export default Home
