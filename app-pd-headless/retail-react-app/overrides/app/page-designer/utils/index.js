/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * Resolve a usable image URL from Shopper Experience / Page Designer payloads.
 */
export function getImageUrl(resolved) {
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

/** Normalize markup attribute values (string or `{html|markup|body|text}`). */
export function getMarkupHtml(value) {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'object') {
        return value.html ?? value.markup ?? value.body ?? value.text ?? ''
    }
    return String(value)
}

/** Product attribute from PD may be a string id or an object. */
export function resolveProductId(product) {
    if (!product) return null
    if (typeof product === 'string') return product
    return product.id || product.productId || product.ID || product.sku || null
}

/** Category attribute from PD may be a string id or an object. */
export function resolveCategoryId(category) {
    if (!category) return null
    if (typeof category === 'string') return category
    return category.id || category.categoryId || category.ID || null
}

export function resolveCategoryName(category, customName) {
    if (customName) return customName
    if (!category) return ''
    if (typeof category === 'string') return category
    return category.name || category.displayName || category.id || ''
}

export function isAbsoluteURL(url) {
    if (!url || typeof url !== 'string') return false
    return /^https?:\/\//i.test(url) || url.startsWith('//')
}

export function categoryHref(categoryId) {
    if (!categoryId) return '/'
    return `/category/${categoryId}`
}

export function productHref(productId) {
    if (!productId) return '/'
    return `/product/${productId}`
}
