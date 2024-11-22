import { Suspense, lazy, useState } from 'react'

import {
  Button,
  ButtonGroup,
  Content,
  Heading,
  IllustratedMessage,
  SearchField,
} from '@adobe/react-spectrum'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Timeout from '@spectrum-icons/illustrations/Timeout'
import ChevronUp from '@spectrum-icons/workflow/ChevronUp'
import ColumnTwoB from '@spectrum-icons/workflow/ColumnTwoB'
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
  const [column, setColumn] = useState(false)
  const [ref] = useAutoAnimate()

  return (
    <div
      className={clsx(
        'grid h-screen w-screen gap-8 bg-neutral-100 p-6 dark:bg-neutral-900',
        !column ? 'grid-rows-[auto_1fr]' : 'grid-cols-2 grid-rows-1',
      )}
    >
      <div className='relative'>
        <Card ref={ref} className={clsx(column && 'h-full overflow-y-scroll')}>
          {!expanded && (
            <FormField name='searchText'>
              <SearchField />
            </FormField>
          )}
          {expanded && <StylesForm />}
        </Card>
        <ButtonGroup
          UNSAFE_className={clsx(
            'absolute z-10 translate-x-1/2 translate-y-1/2 rounded-xl bg-white dark:bg-neutral-800',
            !column
              ? 'bottom-1 right-1/2 px-5 py-2 '
              : 'right-0 top-1/2 -translate-y-1/2 p-2',
          )}
        >
          {!column && (
            <Button variant='primary' onPress={() => setExpanded(!expanded)}>
              <ChevronUp UNSAFE_className={clsx(!expanded && 'rotate-180')} />
            </Button>
          )}
          <Button
            variant='primary'
            onPress={() => {
              setExpanded(true)
              setColumn(!column)
            }}
          >
            <ColumnTwoB
              UNSAFE_className={clsx(column ? 'rotate-90' : 'rotate-180')}
            />
          </Button>
        </ButtonGroup>
      </div>

      <Card className='overflow-hidden p-0'>
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
