/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/* istanbul ignore file */

import React from 'react'
import loadable from '@loadable/component'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'

import {Skeleton} from '@salesforce/retail-react-app/app/components/shared/ui'
import {configureRoutes} from '@salesforce/retail-react-app/app/utils/routes-utils'
import {routes as templateRoutes} from '@salesforce/retail-react-app/app/routes'

const fallback = <Skeleton height="75vh" width="100%" />

// Local overrides
const Home = loadable(() => import('./pages/home'), {fallback})
const PageDesignerPage = loadable(() => import('./pages/page-viewer'), {fallback})
const MyNewRoute = loadable(() => import('./pages/my-new-route'), {fallback})

// Used only for dynamic auth routes in default export (same as template app/routes.jsx)
const Login = loadable(() => import('@salesforce/retail-react-app/app/pages/login'), {fallback})
const ResetPassword = loadable(() => import('@salesforce/retail-react-app/app/pages/reset-password'), {
    fallback
})
const SocialLoginRedirect = loadable(
    () => import('@salesforce/retail-react-app/app/pages/social-login-redirect'),
    {fallback}
)
const PageNotFound = loadable(() => import('@salesforce/retail-react-app/app/pages/page-not-found'))

const templateRoutesWithoutHome = templateRoutes.filter((r) => !(r.path === '/' && r.exact))

// Page Designer preview: BM appends pageId (and mode, pdToken) as query params. Use static
// "/page" in experience metadata so BM does not request the literal path "/page/:pageId".
// "/page/:pageId" remains for direct storefront links.
export const routes = [
    {
        path: '/page',
        component: PageDesignerPage,
        exact: true
    },
    {
        path: '/page/:pageId',
        component: PageDesignerPage
    },
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/my-new-route',
        component: MyNewRoute,
        exact: true
    },
    ...templateRoutesWithoutHome
]

export default () => {
    const config = getConfig()
    const loginConfig = config?.app?.login
    const resetPasswordLandingPath = loginConfig?.resetPassword?.landingPath
    const socialLoginEnabled = loginConfig?.social?.enabled
    const socialRedirectURI = loginConfig?.social?.redirectURI
    const passwordlessLoginEnabled = loginConfig?.passwordless?.enabled
    const passwordlessLoginLandingPath = loginConfig?.passwordless?.landingPath

    const dynamicRoutes = [
        resetPasswordLandingPath && {
            path: resetPasswordLandingPath,
            component: ResetPassword,
            exact: true
        },
        passwordlessLoginEnabled &&
            passwordlessLoginLandingPath && {
                path: passwordlessLoginLandingPath,
                component: Login,
                exact: true
            },
        socialLoginEnabled &&
            socialRedirectURI && {
                path: socialRedirectURI,
                component: SocialLoginRedirect,
                exact: true
            }
    ].filter(Boolean)

    const allRoutes = configureRoutes([...routes, ...dynamicRoutes], config, {
        ignoredRoutes: ['/callback'],
        fuzzyPathMatching: true
    })

    return [...allRoutes, {path: '*', component: PageNotFound}]
}
