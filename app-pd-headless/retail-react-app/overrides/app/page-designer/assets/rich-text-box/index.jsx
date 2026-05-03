/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
/* eslint-disable react/prop-types -- PD attribute_definitions map to props dynamically */
import React from 'react'
import {Box, Text} from '@salesforce/retail-react-app/app/components/shared/ui'

/**
 * Rich text from Page Designer — attribute id in BM becomes the prop name (`richText`, `rich_text`, etc.).
 */
export const RichTextBox = ({
    richText,
    rich_text: richUnderscore,
    body,
    content,
    markup,
    html,
    text,
    ITCText,
    ...rest
}) => {
    let raw =
        richText ??
        richUnderscore ??
        body ??
        content ??
        markup ??
        html ??
        text ??
        ITCText ??
        rest.richText ??
        rest.rich_text

    if (raw && typeof raw === 'object') {
        raw = raw.html ?? raw.markup ?? raw.body ?? raw.text ?? ''
    }

    const richTextBox = typeof raw === 'string' ? raw : raw != null ? String(raw) : ''

    if (!richTextBox.trim()) {
        return null
    }

    return (
        <Box className="text-box-wrapper">
            <Text as="span" className={'rich-text-box'} color={'black'}>
                <Box
                    dangerouslySetInnerHTML={{
                        __html: richTextBox
                    }}
                    sx={{
                        ['h1, h2, h3, h4, h5, h6']: {
                            fontSize: 'revert',
                            fontWeight: 'revert'
                        },
                        p: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    }}
                />
            </Text>
        </Box>
    )
}

export default RichTextBox
