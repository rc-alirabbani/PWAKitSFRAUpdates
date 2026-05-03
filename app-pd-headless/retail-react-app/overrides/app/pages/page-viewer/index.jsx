// app/pages/page-viewer/index.jsx
import React from 'react'
import {useParams} from 'react-router-dom'
import {Box} from '@salesforce/retail-react-app/app/components/shared/ui'
import {usePage} from '@salesforce/commerce-sdk-react'
import {Page} from '@salesforce/commerce-sdk-react/components'
import {HTTPError, HTTPNotFound} from '@salesforce/pwa-kit-react-sdk/ssr/universal/errors'

const PageViewer = () => {
  const {pageId} = useParams()
  const {data: page, error} = usePage({parameters: {pageId}})

  if (error) {
    let ErrorClass = error.response?.status === 404 ? HTTPNotFound : HTTPError
    throw new ErrorClass(error.response?.statusText)
  }

  return (
    <Box layerStyle={'page'}>
      {/* No components prop needed - registry handles it */}
      <Page page={page} />
    </Box>
  )
}

export default PageViewer