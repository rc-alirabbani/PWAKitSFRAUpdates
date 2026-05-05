import React, {useEffect} from 'react'
import {Prompt} from 'react-router-dom'
import {usePageDesignerMode} from '@salesforce/commerce-sdk-react/components'
import {useGlobalAnchorBlock} from '../../hooks/use-global-anchor-block'

export function PageDesignerInit() {
  const {isDesignMode} = usePageDesignerMode()

  useGlobalAnchorBlock(isDesignMode)

  useEffect(() => {
    if (isDesignMode) {
      void import('@salesforce/storefront-next-runtime/design/styles.css')
    }
  }, [isDesignMode])

  return <Prompt when={isDesignMode} message={() => false} />
}

export default PageDesignerInit
