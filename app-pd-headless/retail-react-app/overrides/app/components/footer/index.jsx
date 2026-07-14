/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Text,
    Divider,
    Image,
    Link,
    SimpleGrid,
    useMultiStyleConfig,
    Select as ChakraSelect,
    createStylesContext,
    FormControl
} from '@salesforce/retail-react-app/app/components/shared/ui'
import {useIntl, FormattedMessage} from 'react-intl'

import LinksList from '@salesforce/retail-react-app/app/components/links-list'
import SubscribeMarketingConsent from '@salesforce/retail-react-app/app/components/subscription'
import {HideOnDesktop, HideOnMobile} from '@salesforce/retail-react-app/app/components/responsive'
import {getPathWithLocale} from '@salesforce/retail-react-app/app/utils/url'
import {getAssetUrl, getRouterBasePath} from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'
import LocaleText from '@salesforce/retail-react-app/app/components/locale-text'
import useMultiSite from '@salesforce/retail-react-app/app/hooks/use-multi-site'
import styled from '@emotion/styled'
import {STORE_LOCATOR_IS_ENABLED} from '@salesforce/retail-react-app/app/constants'
import {CONSENT_TAGS} from '@salesforce/retail-react-app/app/constants/marketing-consent'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'
import {HEADER_LOGO_STATIC_PATH} from '../../constants'

const [StylesProvider] = createStylesContext('Footer')

const Footer = ({...otherProps}) => {
    const styles = useMultiStyleConfig('Footer')
    const intl = useIntl()
    const [locale, setLocale] = useState(intl.locale)
    const {site, buildUrl} = useMultiSite()
    const {l10n} = site
    const storeLocatorEnabled = getConfig()?.app?.storeLocatorEnabled ?? STORE_LOCATOR_IS_ENABLED
    const supportedLocaleIds = l10n?.supportedLocales.map((localeItem) => localeItem.id)
    const showLocaleSelector = supportedLocaleIds?.length > 1

    const logoAlt = intl.formatMessage({
        id: 'footer.logo.assistive_msg',
        defaultMessage: 'Royal Cyber home'
    })

    const Select = styled(ChakraSelect)({
        option: styles.localeDropdownOption
    })

    const makeOurCompanyLinks = () => {
        const links = []
        if (storeLocatorEnabled) {
            links.push({
                href: '/store-locator',
                text: intl.formatMessage({
                    id: 'footer.link.store_locator',
                    defaultMessage: 'Store Locator'
                })
            })
        }
        links.push({
            href: '/',
            text: intl.formatMessage({
                id: 'footer.link.about_us',
                defaultMessage: 'About Us'
            })
        })
        return links
    }

    return (
        <Box as="footer" className="rc-footer" {...styles.container} {...otherProps}>
            <Box {...styles.content} as="section">
                <StylesProvider value={styles}>
                    <Box className="rc-footer__brand" mb={{base: 6, md: 8}}>
                        <Link
                            href="/"
                            display="inline-block"
                            aria-label={logoAlt}
                            _hover={{textDecoration: 'none', opacity: 0.9}}
                        >
                            <Image
                                className="rc-footer__logo"
                                src={getAssetUrl(HEADER_LOGO_STATIC_PATH)}
                                alt={logoAlt}
                                htmlWidth={180}
                                htmlHeight={42}
                                maxH="42px"
                                w="auto"
                            />
                        </Link>
                        <Text className="rc-footer__tagline" mt={3} maxW="32rem" fontSize="sm">
                            <FormattedMessage
                                id="footer.brand.tagline"
                                defaultMessage="Curated fashion, jewelry, and lifestyle — designed for how you shop today."
                            />
                        </Text>
                    </Box>

                    <HideOnMobile>
                        <SimpleGrid columns={4} spacing={3}>
                            <LinksList
                                heading={intl.formatMessage({
                                    id: 'footer.column.customer_support',
                                    defaultMessage: 'Customer Support'
                                })}
                                links={[
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.contact_us',
                                            defaultMessage: 'Contact Us'
                                        })
                                    },
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.shipping',
                                            defaultMessage: 'Shipping'
                                        })
                                    }
                                ]}
                            />
                            <LinksList
                                heading={intl.formatMessage({
                                    id: 'footer.column.account',
                                    defaultMessage: 'Account'
                                })}
                                links={[
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.order_status',
                                            defaultMessage: 'Order Status'
                                        })
                                    },
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.signin_create_account',
                                            defaultMessage: 'Sign in or create account'
                                        })
                                    }
                                ]}
                            />
                            <LinksList
                                heading={intl.formatMessage({
                                    id: 'footer.column.our_company',
                                    defaultMessage: 'Our Company'
                                })}
                                links={makeOurCompanyLinks()}
                            />
                            <Box>
                                <SubscribeMarketingConsent tag={CONSENT_TAGS.EMAIL_CAPTURE} />
                            </Box>
                        </SimpleGrid>
                    </HideOnMobile>

                    <HideOnDesktop>
                        <SubscribeMarketingConsent tag={CONSENT_TAGS.EMAIL_CAPTURE} />
                    </HideOnDesktop>

                    {showLocaleSelector && (
                        <Box {...styles.localeSelector}>
                            <FormControl
                                data-testid="sf-footer-locale-selector"
                                id="locale_selector"
                                width="auto"
                                {...otherProps}
                            >
                                <Select
                                    defaultValue={locale}
                                    onChange={({target}) => {
                                        setLocale(target.value)
                                        const newUrl = getPathWithLocale(target.value, buildUrl, {
                                            disallowParams: ['refine']
                                        })
                                        const basePath = getRouterBasePath()
                                        window.location = basePath ? `${basePath}${newUrl}` : newUrl
                                    }}
                                    variant="filled"
                                    aria-label={intl.formatMessage({
                                        id: 'footer.locale_selector.assistive_msg',
                                        defaultMessage: 'Select Language'
                                    })}
                                    {...styles.localeDropdown}
                                >
                                    {supportedLocaleIds.map((localeId) => (
                                        <option key={localeId} value={localeId}>
                                            <LocaleText shortCode={localeId} />
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    )}

                    <Divider {...styles.horizontalRule} />

                    <Box {...styles.bottomHalf}>
                        <Text {...styles.copyright}>
                            &copy; {new Date().getFullYear()}{' '}
                            {intl.formatMessage({
                                id: 'footer.message.copyright',
                                defaultMessage:
                                    'Royal Cyber. Demo storefront only — orders will not be processed.'
                            })}
                        </Text>

                        <HideOnDesktop>
                            <LegalLinks variant="vertical" />
                        </HideOnDesktop>
                        <HideOnMobile>
                            <LegalLinks variant="horizontal" />
                        </HideOnMobile>
                    </Box>
                </StylesProvider>
            </Box>
        </Box>
    )
}

export default Footer

const LegalLinks = ({variant}) => {
    const intl = useIntl()
    return (
        <LinksList
            links={[
                {
                    href: '/',
                    text: intl.formatMessage({
                        id: 'footer.link.terms_conditions',
                        defaultMessage: 'Terms & Conditions'
                    })
                },
                {
                    href: '/',
                    text: intl.formatMessage({
                        id: 'footer.link.privacy_policy',
                        defaultMessage: 'Privacy Policy'
                    })
                },
                {
                    href: '/',
                    text: intl.formatMessage({
                        id: 'footer.link.site_map',
                        defaultMessage: 'Site Map'
                    })
                }
            ]}
            color="whiteAlpha.800"
            variant={variant}
        />
    )
}
LegalLinks.propTypes = {
    variant: PropTypes.oneOf(['vertical', 'horizontal'])
}
