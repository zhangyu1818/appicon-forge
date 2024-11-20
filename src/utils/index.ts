import type { Shadow } from '@/context'

export const colorOrLinearGradient = (
  value: string[],
  direction: number = 180,
) => {
  return value.length === 1
    ? value[0]
    : `linear-gradient(${direction}deg, ${value.join(', ')})`
}

export const getShadowCSS = (insetShadow: Shadow[], inset?: boolean) => {
  return insetShadow
    .map(
      ([x, y, size, blur, color]) =>
        `${x}px ${y}px ${blur}px ${size}px ${color} ${inset ? 'inset' : ''}`,
    )
    .join(', ')
}

export const scaleValue = (value: number, scale: number) => value * scale

export const scaleShadow = (shadow: Shadow, scale: number) => {
  const [x, y, blur, spread, color] = shadow
  return [
    scaleValue(x, scale),
    scaleValue(y, scale),
    scaleValue(blur, scale),
    scaleValue(spread, scale),
    color,
  ] satisfies Shadow
}
