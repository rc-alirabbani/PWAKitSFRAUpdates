/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * Dual-brand top strip matching Royal Cyber demo (DECIEM · ONE CART).
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Flex, Text, Link as ChakraLink} from '@salesforce/retail-react-app/app/components/shared/ui'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'
import Link from '@salesforce/retail-react-app/app/components/link'

const HeaderTopBar = ({config: configProp}) => {
    const fromApp = getConfig()?.app?.dualBrandTopBar
    const cfg = configProp ?? fromApp

    if (!cfg?.enabled) {
        return null
    }

    const {
        tagline = 'DECIEM · ONE CART',
        composableLabel = 'Brand one (PWA)',
        sfraLabel = 'Brand two (SFRA)',
        sfraSiteUrl = '',
        openSfraInNewTab = false
    } = cfg

    const sfraHref = typeof sfraSiteUrl === 'string' ? sfraSiteUrl.trim() : ''

    return (
        <Box as="div" className="rc-header-top-bar header-banner" width="100%" flexShrink={0}>
            <Flex
                className="rc-header-top-bar__container"
                maxWidth="container.xxxl"
                marginInline="auto"
                px={[4, 4, 6, 8]}
                py={2}
                justify="space-between"
                align="center"
                flexWrap="wrap"
                gap={3}
            >
                <Text
                    as="div"
                    className="rc-header-top-bar__tagline"
                    margin={0}
                    flex="1 1 auto"
                    minWidth="min(100%, 12rem)"
                >
                    {tagline}
                </Text>
                <Flex
                    as="nav"
                    className="rc-header-top-bar__switcher"
                    gap={2}
                    align="center"
                    flexShrink={0}
                    aria-label="Choose storefront"
                >
                    <Link
                        to="/"
                        className="rc-header-top-bar__link rc-header-top-bar__link--current"
                    >
                        {composableLabel}
                    </Link>
                    {sfraHref ? (
                        <ChakraLink
                            href={sfraHref}
                            className="rc-header-top-bar__link"
                            target={openSfraInNewTab ? '_blank' : undefined}
                            rel={openSfraInNewTab ? 'noopener noreferrer' : undefined}
                        >
                            {sfraLabel}
                        </ChakraLink>
                    ) : (
                        <Text
                            as="span"
                            className="rc-header-top-bar__link rc-header-top-bar__link--disabled"
                        >
                            {sfraLabel}
                        </Text>
                    )}
                </Flex>
            </Flex>
        </Box>
    )
}

HeaderTopBar.propTypes = {
    config: PropTypes.shape({
        enabled: PropTypes.bool,
        tagline: PropTypes.string,
        composableLabel: PropTypes.string,
        sfraLabel: PropTypes.string,
        sfraSiteUrl: PropTypes.string,
        openSfraInNewTab: PropTypes.bool
    })
}

export default HeaderTopBar
