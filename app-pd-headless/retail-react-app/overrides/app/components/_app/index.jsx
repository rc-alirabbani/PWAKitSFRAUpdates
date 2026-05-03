
// app/components/_app/index.jsx
import {PageDesignerProvider} from '@salesforce/commerce-sdk-react/components'
import {useUsid} from '@salesforce/commerce-sdk-react'
import {initializeRegistry} from '../../page-designer/registry'
import {PageDesignerInit} from '../page-designer-init'

// Initialize registry synchronously at module load time so components are available during SSR
initializeRegistry()

const App = (props) => {
  const {children} = props
  const {usid} = useUsid()

  // Detect Page Designer mode from URL
  const pageDesignerMode = useMemo(() => {
    const queryParams = location?.search || ''
    if (queryParams.includes('mode=EDIT')) return 'EDIT'
    if (queryParams.includes('mode=PREVIEW')) return 'PREVIEW'
    return undefined
  }, [])

  return (
    <Box className="sf-app">
      <PageDesignerProvider
        clientId="pwa-kit-client"
        targetOrigin="*"
        usid={usid}
        mode={pageDesignerMode}
      >
        <PageDesignerInit />
        {children}
      </PageDesignerProvider>
    </Box>
  )
}