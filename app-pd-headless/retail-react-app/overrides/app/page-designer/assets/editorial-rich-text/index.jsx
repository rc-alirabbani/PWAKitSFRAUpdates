/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {Box, Text} from '@salesforce/retail-react-app/app/components/shared/ui'

/**
 * Editorial rich text component
 *
 * @param {object} props
 * @param {string} - props.ITCText - Rich Text Content.
 * @returns {React.ReactElement} - EditorialRichText component.
 */
export const EditorialRichText = (prop) => {
    return (
        <Box className={`rich-text-editor ${prop.textEditClass}`}>
            <Text as="span" className={'text-editor-content'}>
                {/* The `dangerouslySetInnerHTML` is safe to use in this context. */}
                {/* The HTML in the response from Page Designer API is already sanitized. */}
                <Box
                    background={'#000'}
                    dangerouslySetInnerHTML={{
                        __html: prop.richText
                    }}
                />
            </Text>
        </Box>
    )
}

export default EditorialRichText
