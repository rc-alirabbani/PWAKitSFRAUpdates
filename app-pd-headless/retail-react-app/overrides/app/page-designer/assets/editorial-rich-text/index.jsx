/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React from 'react'
import {Box} from '@salesforce/retail-react-app/app/components/shared/ui'
import {getMarkupHtml} from '../../utils'

/**
 * Editorial rich text — BM attribute ids map to props (`richText`, `ITCText`, etc.).
 */
export const EditorialRichText = (props) => {
    const {
        richText,
        ITCText,
        body,
        content,
        markup,
        html,
        text,
        textEditClass,
        ...rest
    } = props

    let raw =
        richText ??
        ITCText ??
        body ??
        content ??
        markup ??
        html ??
        text ??
        rest.richText ??
        rest.ITCText

    if (raw && typeof raw === 'object') {
        raw = raw.html ?? raw.markup ?? raw.body ?? raw.text ?? ''
    }

    const inner = typeof raw === 'string' ? raw : raw != null ? String(raw) : ''
    if (!inner) return null

    return (
        <Box
            className={`rich-text-editor pd-editorial-rich-text ${textEditClass || ''}`}
            w="100%"
            maxW="100%"
            px={{base: 2, md: 4}}
            py={{base: 2, md: 3}}
            color="#1a1a1a"
            textAlign="left"
            sx={{
                a: {color: '#f58220', fontWeight: 600},
                'h1, h2, h3, h4': {
                    color: '#004a82',
                    fontWeight: 700,
                    lineHeight: 1.25,
                    mb: 3,
                    textAlign: 'left'
                },
                h1: {fontSize: {base: '2xl', md: '3xl', lg: '4xl'}},
                h2: {fontSize: {base: 'xl', md: '2xl', lg: '3xl'}},
                p: {lineHeight: 1.65, mb: 3, color: '#1a1a1a', textAlign: 'left'},
                'p:last-child': {mb: 0},
                '*:first-child': {mt: 0},
                '*:last-child': {mb: 0}
            }}
        >
            <Box
                className="text-editor-content"
                dangerouslySetInnerHTML={{
                    __html: getMarkupHtml(inner) || inner
                }}
            />
        </Box>
    )
}

export default EditorialRichText
