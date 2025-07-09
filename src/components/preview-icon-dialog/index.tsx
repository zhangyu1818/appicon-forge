import { useRef } from 'react'

import { CircleArrowOutUpLeftIcon, XIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { downloadImage } from '@/lib/utils'
import { useStore } from '@/store'
import { Settings } from '@/store/constants'

import { DownloadButton } from '../download-button'
import { IconCard } from '../icon-card'
import { ThemeToggle } from '../theme-toggle'
import { Button } from '../ui/button'

export const PreviewDialog = () => {
  const { t } = useTranslation()

  const [{ imageSize, previewIcon, searchQuery }, setComponentsState] =
    useStore((store) => store.componentsState)

  const iconCardRef = useRef<HTMLDivElement>(null)

  const closePreview = () => {
    setComponentsState((draft) => {
      draft.previewIcon = null
    })
  }

  const goToCollection = () => {
    if (previewIcon) {
      setComponentsState((draft) => {
        draft.searchQuery = ''
        draft.selectedCollection = previewIcon.collection
      })
    }
    closePreview()
  }

  const isOpenFromSearch = !!searchQuery

  return (
    <AnimatePresence>
      {previewIcon && (
        <motion.div
          animate={{ opacity: 1 }}
          className='absolute inset-0 grid grid-rows-[auto_1fr] overflow-hidden overflow-y-auto rounded-2xl bg-background'
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onAnimationComplete={() => {
            setComponentsState((draft) => {
              if (previewIcon.name) {
                draft.selectedSettings = Settings.Download
              }
            })
          }}
          onClick={closePreview}
        >
          <div className='flex items-center justify-end gap-4 p-2'>
            <ThemeToggle />
            <Button className='p-4' size='icon' variant='ghost'>
              <XIcon />
            </Button>
          </div>
          <div className='flex flex-col items-center justify-center gap-4 lg:gap-8'>
            <IconCard ref={iconCardRef} inPreview icon={previewIcon} />
            <div className='flex flex-col gap-2'>
              <p className='flex items-center gap-4'>
                <span className='flex-1'>{t('icon name')}</span>
                {previewIcon.iconName}
              </p>
              <p className='flex items-center gap-4'>
                <span className='flex-1'>{t('collections.author')}</span>
                <a
                  className='underline'
                  href={previewIcon.collection.author.url}
                >
                  {previewIcon.collection.author.name}
                </a>
              </p>
              <p className='flex items-center gap-4'>
                <span className='flex-1'>{t('collections.license')}</span>
                <a
                  className='underline'
                  href={previewIcon.collection.license.url}
                >
                  {previewIcon.collection.license.title}
                </a>
              </p>
            </div>
            <div className='flex gap-4'>
              {isOpenFromSearch && (
                <Button
                  size='lg'
                  variant='outline'
                  onClick={(e) => {
                    e.stopPropagation()
                    goToCollection()
                  }}
                >
                  <CircleArrowOutUpLeftIcon />
                  {t('go to collection')}
                </Button>
              )}
              <DownloadButton
                onClick={(downloadType) => {
                  downloadImage(
                    imageSize,
                    previewIcon.name,
                    downloadType,
                    iconCardRef.current,
                  )
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
