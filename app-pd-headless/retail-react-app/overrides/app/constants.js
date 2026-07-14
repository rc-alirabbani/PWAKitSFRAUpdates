/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/** Header logo (file under overrides/app/static/). */
export const HEADER_LOGO_STATIC_PATH = 'static/images/Royal-Cyber-Logo.svg'

/** Small uppercase line above the hero headline. */
export const CUSTOM_HOME_BANNER = 'Royal Cyber · Digital Commerce'

/** Main hero headline. */
export const CUSTOM_HOME_TITLE = 'Discover style that moves with you'

export const HOME_HERO_IMAGE_DESKTOP = 'static/images/homepage-banner-desktop.jpg'
export const HOME_HERO_IMAGE_MOBILE = 'static/images/homepage-banner-mobile.jpg'

/** Responsive src widths for home product strip tiles. */
export const HOME_PRODUCT_TILE_IMAGE_WIDTHS = ['72vw', '46vw', '28vw', '22vw']

/** Category tiles on the home page. */
export const HOME_CATEGORY_TILES = [
    {label: 'Womens', href: '/category/womens', image: 'static/images/women-category.jpg'},
    {label: 'Mens', href: '/category/mens', image: 'static/images/men-category.jpg'},
    {label: 'Electronics', href: '/category/electronics', image: 'static/images/electronics.jpg'},
    {label: 'Jewelry', href: '/category/jewelry', image: 'static/images/category-jewelry.jpg'}
]

export * from '@salesforce/retail-react-app/app/constants'
