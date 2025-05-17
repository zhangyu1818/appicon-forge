import { createColor, createShadow } from '@/lib/utils'

import { Gradient } from './constants'

import type { Styles } from './interface'

export const defaultBackgroundColor = '#F5F5F5'
export const defaultBorderColor = '#D1D1D1'
export const defaultTextColor = '#000'
export const defaultShadowColor = 'rgba(0, 0, 0, 0.1)'
export const defaultIconColor = '#333'
export const defaultTextFont = 'sans-serif'
export const defaultTextShadowAndIconShadowColor = 'rgba(0, 0, 0, 0.5)'

export const defaultStyles: Styles = {
  backgroundColors: [createColor(defaultBackgroundColor)],
  backgroundGradient: Gradient.Linear,
  backgroundRotation: 180,
  borderColors: [createColor(defaultBorderColor)],
  borderGradient: Gradient.Linear,
  borderRadius: [64, 64, 64, 64],
  borderRotation: 180,
  borderWidth: 8,
  iconColor: defaultIconColor,
  iconOffset: [0, 0],
  iconPerspective: [false, 0, 0],
  iconRotation: 0,
  iconShadow: [createShadow(defaultTextShadowAndIconShadowColor)],
  iconSize: 128,
  insetShadows: [createShadow(defaultShadowColor)],
  padding: true,
  shadows: [createShadow(defaultShadowColor)],
  textColorRotation: 0,
  textColors: [createColor(defaultTextColor)],
  textFont: defaultTextFont,
  textGradient: Gradient.Linear,
  textItalic: false,
  textOffset: [0, 0],
  textPerspective: [false, 0, 0],
  textRotation: 0,
  textShadow: [createShadow(defaultTextShadowAndIconShadowColor)],
  textSize: 128,
  textStroke: false,
  textStrokeColor: defaultBackgroundColor,
  textStrokeWidth: 2,
  textValue: '',
  textWeight: '400',
}
