import { Suspense, lazy, memo } from 'react'

import { DialogContainer } from '@adobe/react-spectrum'

import { useSelector } from '@/context'

const Dialog = lazy(() =>
  import('./dialog').then((module) => ({ default: module.Dialog })),
)

export const PreviewDialog = memo(() => {
  const [iconName, setIconName] = useSelector((state) => state.iconName)

  return (
    <DialogContainer
      isDismissable
      type='fullscreenTakeover'
      onDismiss={() => setIconName(null)}
    >
      {!!iconName && (
        <Suspense>
          <Dialog />
        </Suspense>
      )}
    </DialogContainer>
  )
})
