import { useRef } from 'react'

import { Separator } from '@/components/ui/separator'
import { downloadImage } from '@/lib/utils'
import { useStore } from '@/store'

import { DownloadButton } from '../download-button'
import { IconCard } from '../icon-card'
import { PreviewContainer } from '../ui/styled'

export const PreviewText = () => {
  const [{ imageSize }] = useStore((store) => store.componentsState)

  const iconCardRef = useRef<HTMLDivElement>(null)

  return (
    <PreviewContainer>
      <Separator />
      <IconCard ref={iconCardRef} inPreview previewType='text' />
      <DownloadButton
        onClick={(downloadType) => {
          downloadImage(imageSize, 'text', downloadType, iconCardRef.current)
        }}
      />
    </PreviewContainer>
  )
}
