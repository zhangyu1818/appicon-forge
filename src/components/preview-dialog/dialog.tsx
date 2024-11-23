import { memo, useRef, useState, type RefObject } from 'react'

import {
  Button,
  ButtonGroup,
  Checkbox,
  Content,
  DialogTrigger,
  Flex,
  Header,
  NumberField,
  Provider,
  Dialog as SpectrumDialog,
  View,
  useProvider,
} from '@adobe/react-spectrum'
import Close from '@spectrum-icons/workflow/Close'
import Download from '@spectrum-icons/workflow/Download'
import Light from '@spectrum-icons/workflow/Light'
import Moon from '@spectrum-icons/workflow/Moon'
import Settings from '@spectrum-icons/workflow/Settings'
import * as Icons from '@tabler/icons-react'
import { toPng } from 'html-to-image'

import { ICON_SIZE, PREVIEW_ICON_SIZE, PREVIEW_SIZE } from '@/constants'
import { useSelector } from '@/context'
import useStyles from '@/hooks/useStyles'
import { scaleValue } from '@/utils'

import { IconCard } from '../icon-card'
import { StylesForm } from '../styles-form'

import type { Icon } from '@tabler/icons-react'

export const Dialog = memo(() => {
  const [iconName, setIconName] = useSelector((state) => state.iconName)
  const { iconColor, iconRoute, iconSize } = useStyles()

  const { colorScheme: providerScheme } = useProvider()
  const [withEmptyPadding, setWithEmptyPadding] = useState(true)
  const [colorScheme, setColorScheme] = useState(providerScheme)
  const [imageSize, setImageSize] = useState(PREVIEW_SIZE)

  const ref = useRef<HTMLDivElement | null>(null)

  const download = () => {
    if (ref.current) {
      toPng(ref.current, {
        canvasHeight: imageSize,
        canvasWidth: imageSize,
        pixelRatio: 1,
      }).then((dataUrl) => {
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = `${iconName}.png`
        a.click()
      })
    }
  }

  const IconComponent = useRef(
    Icons[iconName as keyof typeof Icons] as Icon,
  ).current

  const renderIconSize = withEmptyPadding ? PREVIEW_ICON_SIZE : PREVIEW_SIZE

  const scale = renderIconSize / ICON_SIZE

  return (
    <Provider colorScheme={colorScheme}>
      <SpectrumDialog height='100vh'>
        <Header>
          <NumberField
            isQuiet
            label='Image Size (px)'
            labelPosition='side'
            marginEnd='size-200'
            value={imageSize}
            onChange={(value) => setImageSize(value)}
          />
          <Checkbox
            isSelected={withEmptyPadding}
            onChange={(value) => setWithEmptyPadding(value)}
          >
            Padding
          </Checkbox>
          <ButtonGroup>
            <Button
              variant='primary'
              onPress={() =>
                setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
              }
            >
              {colorScheme === 'light' ? <Moon /> : <Light />}
            </Button>
            <DialogTrigger type='popover'>
              <Button variant='primary'>
                <Settings />
              </Button>
              <SpectrumDialog width={1024}>
                <Content>
                  <StylesForm inModal />
                </Content>
              </SpectrumDialog>
            </DialogTrigger>
            <Button variant='primary' onPress={download}>
              <Download />
            </Button>
            <Button variant='primary' onPress={() => setIconName(null)}>
              <Close />
            </Button>
          </ButtonGroup>
        </Header>
        <Content UNSAFE_style={{ marginBottom: -40 }}>
          <Flex
            UNSAFE_className='p-4'
            alignItems='center'
            justifyContent='center'
          >
            <div
              ref={ref as RefObject<HTMLDivElement>}
              className='flex items-center justify-center'
              style={{ height: PREVIEW_SIZE, width: PREVIEW_SIZE }}
            >
              <View height={renderIconSize} width={renderIconSize}>
                <IconCard preview>
                  <IconComponent
                    style={{
                      color: iconColor,
                      height: scaleValue(iconSize, scale),
                      transform: `rotate(${iconRoute}deg)`,
                      width: scaleValue(iconSize, scale),
                    }}
                  />
                </IconCard>
              </View>
            </div>
          </Flex>
        </Content>
      </SpectrumDialog>
    </Provider>
  )
})
