import { DownloadIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DownloadTypes } from '@/store/constants'

import { Button } from '../ui/button'

interface DownloadButtonProps {
  onClick: (downloadType: DownloadTypes) => void
}

export const DownloadButton = (props: DownloadButtonProps) => {
  const { onClick } = props
  const { t } = useTranslation()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='shrink-0' size='lg'>
          <DownloadIcon />
          {t('download')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {[DownloadTypes.Png, DownloadTypes.Svg, DownloadTypes.Jpeg].map(
          (type) => (
            <DropdownMenuItem
              key={type}
              onClick={(e) => {
                e.stopPropagation()
                onClick(type)
              }}
            >
              {type}
            </DropdownMenuItem>
          ),
        )}
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            onClick(DownloadTypes.InnerSvg)
          }}
        >
          {t('inner svg')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
