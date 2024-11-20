import { Flex, type FlexProps } from '@adobe/react-spectrum'

import { ICON_SIZE, PREVIEW_ICON_SIZE } from '@/constants'
import useStyles from '@/hooks/useStyles'
import {
  colorOrLinearGradient,
  getShadowCSS,
  scaleShadow,
  scaleValue,
} from '@/utils'

export interface IconCardProps extends FlexProps {
  preview?: boolean
}

export const IconCard = (props: IconCardProps) => {
  const { children, preview } = props
  const {
    backgroundColor,
    backgroundDirection,
    borderColor,
    borderDirection,
    borderSize,
    insetShadow,
    radius,
    shadow,
  } = useStyles()

  const scale = preview ? PREVIEW_ICON_SIZE / ICON_SIZE : 1

  const insetShadowCSS = getShadowCSS(
    insetShadow.map((v) => scaleShadow(v, scale)),
    true,
  )
  const shadowCSS = getShadowCSS(shadow.map((v) => scaleShadow(v, scale)))

  return (
    <Flex
      UNSAFE_style={{
        background: colorOrLinearGradient(borderColor, borderDirection),
        borderRadius: scaleValue(radius, scale),
        boxShadow: shadowCSS,
        padding: scaleValue(borderSize, scale),
      }}
      alignItems='center'
      height='100%'
      justifyContent='center'
      width='100%'
    >
      <Flex
        UNSAFE_style={{
          background: colorOrLinearGradient(
            backgroundColor,
            backgroundDirection,
          ),
          borderRadius:
            scaleValue(radius, scale) - scaleValue(borderSize, scale),
          boxShadow: insetShadowCSS,
        }}
        alignItems='center'
        height='100%'
        justifyContent='center'
        width='100%'
      >
        {children}
      </Flex>
    </Flex>
  )
}
