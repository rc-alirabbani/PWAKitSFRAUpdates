// RichTextBox.test.js
import React from 'react'
import RichTextBox from './index'
import {renderWithProviders} from '@salesforce/retail-react-app/app/utils/test-utils'

const SAMPLE_DATA = {
    richText: '<p>This is a <strong>test</strong> rich <strong>text</strong> content.</p>'
}

test('Page renders correct component', () => {
    const {getByText} = renderWithProviders(<RichTextBox {...SAMPLE_DATA} />)

    expect(getByText(/Rich Text Box component/i)).toBeInTheDocument()
})
