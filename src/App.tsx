import { Suspense, lazy } from 'react'

import { Content, Heading, IllustratedMessage } from '@adobe/react-spectrum'
import Timeout from '@spectrum-icons/illustrations/Timeout'

import { PreviewDialog } from './components/preview-dialog'
import { Card } from './components/styled'
import { StylesForm } from './components/styles-form'
import { GAP, ICON_SIZE } from './constants'

const VirtualGrid = lazy(() =>
  import('@/components/virtual-grid').then((module) => ({
    default: module.VirtualGrid,
  })),
)

function App() {
  return (
    <div className='flex h-screen w-screen flex-col gap-8 bg-neutral-100 p-6 dark:bg-neutral-900'>
      <Card>
        <StylesForm />
      </Card>
      <Card className='flex-1 overflow-hidden p-0'>
        <Suspense
          fallback={
            <IllustratedMessage>
              <Timeout />
              <Heading>Loading...</Heading>
              <Content>Loading the icon list, please wait. </Content>
            </IllustratedMessage>
          }
        >
          <VirtualGrid
            className='size-full'
            gap={GAP}
            itemHeight={ICON_SIZE}
            style={{ padding: GAP }}
          />
        </Suspense>
      </Card>
      <PreviewDialog />
    </div>
  )
}

export default App
