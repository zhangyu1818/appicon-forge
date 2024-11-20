import { Suspense, lazy, memo, useCallback, useRef } from 'react'

import { DialogContainer } from '@adobe/react-spectrum'
import { toPng } from 'html-to-image'

import { useSelector } from '@/context'

const Dialog = lazy(() =>
  import('./dialog').then((module) => ({ default: module.Dialog })),
)

export const PreviewDialog = memo(() => {
  const [iconName, setIconName] = useSelector((state) => state.iconName)

  const ref = useRef<HTMLDivElement | null>(null)

  const download = useCallback(() => {
    if (ref.current) {
      toPng(ref.current).then((dataUrl) => {
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = `${iconName}.png`
        a.click()
      })
    }
  }, [iconName])

  return (
    <DialogContainer
      isDismissable
      type='fullscreenTakeover'
      onDismiss={() => setIconName(null)}
    >
      {!!iconName && (
        <Suspense>
          <Dialog ref={ref} onDownload={download} />
        </Suspense>
      )}
    </DialogContainer>
  )
})
