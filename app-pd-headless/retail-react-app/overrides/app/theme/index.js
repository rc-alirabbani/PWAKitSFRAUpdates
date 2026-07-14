/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {extendTheme} from '@salesforce/retail-react-app/app/components/shared/ui'
import baseTheme from '@salesforce/retail-react-app/app/theme'
import baseButton from '@salesforce/retail-react-app/app/theme/components/base/button'
import baseHeader from '@salesforce/retail-react-app/app/theme/components/project/header'
import baseListMenu from '@salesforce/retail-react-app/app/theme/components/project/list-menu'
import baseFooter from '@salesforce/retail-react-app/app/theme/components/project/footer'
import productTileTheme from '@salesforce/retail-react-app/app/theme/components/project/product-tile'

/** Royal Cyber primary CTA orange — replaces default Chakra orange scale for buttons */
const rcOrange = {
    50: '#fff8f2',
    100: '#ffeedd',
    200: '#ffd4b8',
    300: '#ffb380',
    400: '#f7934d',
    500: '#f58220',
    600: '#e07618',
    700: '#b85f12',
    800: '#8a4710',
    900: '#5c300b'
}

/**
 * Default primary buttons use RC orange; explicit colorScheme="blue" keeps Salesforce blue CTAs where set.
 */
const rcButton = {
    ...baseButton,
    defaultProps: {
        ...baseButton.defaultProps,
        colorScheme: 'orange'
    },
    variants: {
        ...baseButton.variants,
        solid: (props) => {
            if (props.colorScheme === 'orange') {
                return {
                    backgroundColor: 'orange.500',
                    color: 'white',
                    boxShadow: 'sm',
                    _hover: {
                        bg: 'orange.600',
                        _disabled: {bg: 'orange.300'}
                    },
                    _active: {bg: 'orange.700'},
                    _disabled: {bg: 'orange.300', color: 'whiteAlpha.900'}
                }
            }
            return baseButton.variants.solid(props)
        },
        outline: (props) => {
            if (props.colorScheme === 'orange') {
                return {
                    borderWidth: '1px',
                    borderColor: 'orange.500',
                    color: 'orange.700',
                    _hover: {
                        bg: 'orange.50',
                        borderColor: 'orange.600'
                    },
                    _active: {bg: 'orange.100'}
                }
            }
            return baseButton.variants.outline(props)
        }
    }
}

/**
 * ProductTile card styling — still driven by API hits (name, price, image, badges, swatches).
 * Merges onto Retail React App defaults without replacing the component.
 */
/** Header content — ensure consistent horizontal gutters. */
const rcHeader = {
    ...baseHeader,
    baseStyle: {
        ...baseHeader.baseStyle,
        content: {
            ...baseHeader.baseStyle.content,
            maxWidth: 'container.xxxl',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: [4, 4, 6, 8, 10],
            paddingRight: [4, 4, 6, 8, 10]
        },
        searchContainer: {
            ...baseHeader.baseStyle.searchContainer,
            width: ['full', 'full', 'full', 72]
        }
    }
}

/** Larger nav triggers + tighter category mega-menu panel (less empty padding). */
const rcListMenu = {
    ...baseListMenu,
    baseStyle: {
        ...baseListMenu.baseStyle,
        popoverBody: {
            ...baseListMenu.baseStyle.popoverBody,
            paddingTop: 2,
            paddingBottom: 3,
            paddingLeft: 3,
            paddingRight: 3
        },
        popoverContainer: {
            ...baseListMenu.baseStyle.popoverContainer,
            paddingBottom: 3,
            paddingTop: 0,
            maxWidth: 'container.xxxl'
        },
        listMenuTriggerLink: {
            ...baseListMenu.baseStyle.listMenuTriggerLink,
            fontSize: 'lg',
            paddingTop: 4,
            paddingBottom: 3,
            paddingInline: 2,
            marginLeft: 4
        },
        listMenuTriggerLinkIcon: {
            ...baseListMenu.baseStyle.listMenuTriggerLinkIcon,
            marginTop: 4,
            marginRight: 3,
            marginBottom: 2
        }
    }
}

const rcProductTile = {
    ...productTileTheme,
    baseStyle: () => {
        const base =
            typeof productTileTheme.baseStyle === 'function'
                ? productTileTheme.baseStyle()
                : productTileTheme.baseStyle || {}
        return {
            ...base,
            container: {
                ...base.container,
                bg: 'white',
                borderRadius: 'lg',
                borderWidth: '1px',
                borderColor: 'gray.200',
                p: 3,
                boxShadow: 'sm',
                transitionProperty: 'box-shadow, border-color',
                transitionDuration: '0.2s',
                _hover: {
                    boxShadow: 'md',
                    borderColor: 'blue.200'
                }
            },
            imageWrapper: {
                ...base.imageWrapper,
                mb: 3,
                borderRadius: 'md',
                overflow: 'hidden',
                bg: 'gray.50'
            },
            title: {
                ...base.title,
                fontWeight: 700,
                fontSize: 'sm',
                color: '#004a82',
                lineHeight: '1.35',
                noOfLines: 2,
                mb: 1
            },
            link: {
                ...base.link,
                _hover: {textDecoration: 'none'}
            },
            badgeGroup: {
                ...base.badgeGroup,
                top: 3,
                left: 3
            },
            favIcon: {
                ...base.favIcon,
                top: 3,
                right: 3
            }
        }
    }
}

const rcFooter = {
    ...baseFooter,
    baseStyle: {
        ...baseFooter.baseStyle,
        // Navy brand surface — contrasts with white logo treatment
        container: {
            ...baseFooter.baseStyle.container,
            background: '#004a82',
            borderTop: '4px solid',
            borderTopColor: 'orange.500'
        },
        content: {
            ...baseFooter.baseStyle.content,
            maxWidth: 'container.xxxl',
            color: 'white',
            paddingLeft: [4, 4, 6, 8, 10],
            paddingRight: [4, 4, 6, 8, 10]
        },
        localeDropdown: {
            ...baseFooter.baseStyle.localeDropdown,
            background: 'rgba(0, 56, 99, 0.85)',
            _hover: {
                background: 'rgba(0, 56, 99, 1)'
            }
        },
        copyright: {
            ...baseFooter.baseStyle.copyright,
            color: 'whiteAlpha.800'
        },
        horizontalRule: {
            ...baseFooter.baseStyle.horizontalRule,
            borderColor: 'whiteAlpha.300'
        }
    }
}

export default extendTheme(
    {
        colors: {
            orange: rcOrange
        },
        layerStyles: {
            page: {
                px: [4, 4, 6, 8, 10],
                paddingTop: 0,
                paddingBottom: 0,
                width: '100%',
                maxWidth: 'container.xxxl',
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        },
        components: {
            Button: rcButton,
            Header: rcHeader,
            Footer: rcFooter,
            ListMenu: rcListMenu,
            ProductTile: rcProductTile
        }
    },
    baseTheme
)