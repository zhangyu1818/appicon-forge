import { useRef, useState } from 'react'

import { IconCard } from '@/components/icon-card'
import { downloadImage } from '@/lib/utils'
import { useStore } from '@/store'

import { DownloadButton } from '../download-button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { PreviewContainer } from '../ui/styled'

export const PreviewUpload = () => {
  const [{ imageSize }] = useStore((store) => store.componentsState)
  const iconCardRef = useRef<HTMLDivElement>(null)
  const [uploadedContent, setUploadedContent] = useState<string>('')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {
      const content = e.target?.result as string
      setUploadedContent(content)
    }

    if (file.type === 'image/svg+xml') {
      reader.readAsText(file)
    } else {
      reader.readAsDataURL(file)
    }
  }

  return (
    <PreviewContainer>
      <Separator />
      <IconCard
        ref={iconCardRef}
        inPreview
        previewType='upload'
        uploadNode={
          uploadedContent && (
            <div className='flex size-full items-center justify-center'>
              {uploadedContent.startsWith('data:image') ? (
                <img
                  alt='Uploaded preview'
                  className='size-full object-contain'
                  src={uploadedContent}
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: uploadedContent }}
                  className='size-full'
                />
              )}
            </div>
          )
        }
      />
      <Input
        accept='.svg,image/*'
        className='w-[200px] shrink-0'
        type='file'
        onChange={handleFileUpload}
      />
      <DownloadButton
        onClick={(downloadType) => {
          downloadImage(imageSize, 'upload', downloadType, iconCardRef.current)
        }}
      />
    </PreviewContainer>
  )
}
