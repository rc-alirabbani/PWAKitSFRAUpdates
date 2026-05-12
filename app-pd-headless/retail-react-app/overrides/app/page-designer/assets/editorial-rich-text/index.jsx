/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {Box, Text} from '@salesforce/retail-react-app/app/components/shared/ui'

/**
 * Editorial rich text — BM attribute ids map to props (`richText`, `ITCText`, etc.).
 *
 * @param {object} props
 * @returns {React.ReactElement}
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

    return (
        <Box className={`rich-text-editor ${textEditClass || ''}`}>
            <Text as="span" className={'text-editor-content'}>
                {/* The `dangerouslySetInnerHTML` is safe to use in this context. */}
                {/* The HTML in the response from Page Designer API is already sanitized. */}
                <Box
                    background={'#000'}
                    dangerouslySetInnerHTML={{
                        __html: inner
                    }}
                />
            </Text>
        </Box>
    )
}

export default EditorialRichText
