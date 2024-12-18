import { useState } from 'react'

import { t } from 'i18next'
import { Import, Share } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { SettingsContainer } from '@/components/ui/styled'
import { Textarea } from '@/components/ui/textarea'
import { createColor } from '@/lib/utils'
import { useStore } from '@/store'

import { defaultStyles } from '@/store/default-value'
import { Styles } from "@/store/interface";

export const ImportAndExportSettings = () => {
  const cls = 'col-span-2 grid grid-cols-subgrid items-center'
  const [style, setStyle] = useStore((store) => store.styles)
  const [showData, setShowData] = useState('')
  const keys: string[] = Object.keys(defaultStyles)
  return (
    <SettingsContainer>
      <div className={cls}>
        <Label>{t('export data')}</Label>
        <Button
          size='icon'
          onClick={() => {
            const data = []
            for (let i = 0; i < keys.length; i++) {
              data[i] =
                i === 0 || i === 3 || i === 17 ?
                  data[i] = (style[keys[i] as keyof Styles] as any[]).map((item: {value: never}) => item.value) :
                  i === 11 || i === 13 || i === 15 || i === 23 ?
                    data[i] = (style[keys[i] as keyof Styles] as any[]).map((item: { value: any }[]) => [item[0], item[1], item[2], item[3], item[4].value]) :
                    style[keys[i] as keyof Styles]
            }
            setShowData(JSON.stringify(data))
          }}
        >
          <Share />
        </Button>
      </div>
      <div className={cls}>
        <Label>{t('import data')}</Label>
        <Button
          size='icon'
          onClick={() => {
            const data = {} as Record<string, any>
            for (let i = 0; i < keys.length; i++) {
              const item = JSON.parse(showData)[i]
              data[keys[i]] =
                i === 0 || i === 3 || i === 17 ?
                  item.map((_item: string) => createColor(_item)) :
                  i === 11 || i === 13 || i === 15 || i === 23?
                    item.map((_item: any) => [_item[0], _item[1], _item[2], _item[3], createColor(_item[4])]) :
                    item
            }
            setStyle(data as Styles)
          }}
        >
          <Import />
        </Button>
      </div>
      <div className={cls}>
        <Label>{t('data text')}</Label>
        <Textarea
          value={showData}
          onChange={(e) => setShowData(e.target.value)}
        />
      </div>
    </SettingsContainer>
  )
}
