import { Suspense, lazy, useState } from 'react'

import {
  Button,
  Content,
  Heading,
  IllustratedMessage,
  SearchField,
} from '@adobe/react-spectrum'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Timeout from '@spectrum-icons/illustrations/Timeout'
import ChevronUp from '@spectrum-icons/workflow/ChevronUp'
import clsx from 'clsx'

import { FormField } from './components/form-field'
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
  const [expanded, setExpanded] = useState(true)
  const [ref] = useAutoAnimate()

  return (
    <div className='flex h-screen w-screen flex-col gap-8 bg-neutral-100 p-6 dark:bg-neutral-900'>
      <div className='relative after:absolute after:-bottom-6 after:right-1/2 after:size-12 after:translate-x-1/2 after:rounded-full after:bg-white after:content-["_"]  after:dark:bg-neutral-800'>
        <Card ref={ref} className='overflow-hidden'>
          {!expanded && (
            <FormField name='searchText'>
              <SearchField />
            </FormField>
          )}
          {expanded && <StylesForm />}
        </Card>
        <Button
          UNSAFE_className='absolute z-10 -bottom-4 right-1/2 translate-x-1/2'
          variant='primary'
          onPress={() => setExpanded(!expanded)}
        >
          <ChevronUp
            UNSAFE_className={clsx(
              'transition-transform duration-300',
              !expanded && 'rotate-180',
            )}
          />
        </Button>
      </div>

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
