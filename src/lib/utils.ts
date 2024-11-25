import { clsx, type ClassValue } from 'clsx'
import { toPng } from 'html-to-image'
import { twMerge } from 'tailwind-merge'

import type { APIv2CollectionResponse } from '@/services/iconify'
import type { Shadow } from '@/store/interface'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const changeValueFromArray = <T>(
  value: T[],
  newValue: T,
  index: number,
): T[] => {
  const newValues = [...value]
  newValues[index] = newValue
  return newValues
}

export const removeValueFromArray = <T>(value: T[], index: number): T[] => {
  const newValues = [...value]
  newValues.splice(index, 1)
  return newValues
}

export const getVisibleIconsAsync = async (
  iconifyData: APIv2CollectionResponse,
): Promise<string[]> => {
  const {
    aliases = {},
    categories = {},
    hidden = [],
    uncategorized = [],
  } = iconifyData

  const iconSet = new Set<string>()

  const batchSize = 1000

  const processArrayBatch = async (array: string[]) => {
    for (let i = 0; i < array.length; i += batchSize) {
      const end = Math.min(i + batchSize, array.length)
      for (let j = i; j < end; j++) {
        iconSet.add(array[j])
      }
      await new Promise((resolve) => setTimeout(resolve, 0))
    }
  }

  const processCategories = async (categories: Record<string, string[]>) => {
    const categoryValues = Object.values(categories)
    for (let i = 0; i < categoryValues.length; i++) {
      const categoryIcons = categoryValues[i]
      await processArrayBatch(categoryIcons)
    }
  }

  await processArrayBatch(uncategorized)

  await processCategories(categories)

  await processArrayBatch(
    hidden.map((icon) => {
      iconSet.delete(icon)
      return icon
    }),
  )

  await processArrayBatch(
    Object.keys(aliases).map((alias) => {
      iconSet.delete(alias)
      return alias
    }),
  )

  return Array.from(iconSet)
}

export const colorOrLinearGradient = (value: string[], direction: number) => {
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

export const getBorderRadiusCSS = (
  radius: [number, number, number, number],
) => {
  return `${radius[0]}px ${radius[1]}px ${radius[2]}px ${radius[3]}px`
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

export const downloadImage = (
  imageSize: number,
  fileName: string,
  element?: HTMLElement | null,
) => {
  if (element) {
    toPng(element, {
      canvasHeight: imageSize,
      canvasWidth: imageSize,
      pixelRatio: 1,
    }).then((dataUrl) => {
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = fileName
      a.click()
    })
  }
}

export const detectFontAvailability = (font: string) => {
  const span = document.createElement('span')
  span.style.position = 'absolute'
  span.style.left = '-9999px'
  span.style.fontSize = '72px'
  span.innerHTML = 'abcdefghijklmnopqrstuvwxyz0123456789'

  const baseFonts = ['sans-serif', 'serif']

  const getDimensions = (fontFamily: string) => {
    span.style.fontFamily = fontFamily
    document.body.appendChild(span)
    const dimensions = { height: span.offsetHeight, width: span.offsetWidth }
    document.body.removeChild(span)
    return dimensions
  }

  const baseDimensions = baseFonts.map(getDimensions)

  for (const base of baseFonts) {
    span.style.fontFamily = `${font}, ${base}`
    const newDimensions = getDimensions(`${font}, ${base}`)
    if (
      newDimensions.width !== baseDimensions[baseFonts.indexOf(base)].width ||
      newDimensions.height !== baseDimensions[baseFonts.indexOf(base)].height
    ) {
      return true
    }
  }
  return false
}
