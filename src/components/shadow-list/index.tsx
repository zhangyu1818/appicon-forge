import {
  Button,
  ColorEditor,
  ColorPicker,
  Flex,
  Slider,
} from '@adobe/react-spectrum'
import Add from '@spectrum-icons/workflow/Add'
import Remove from '@spectrum-icons/workflow/Remove'

import { defaultShadow, type Shadow } from '@/context'

export interface ShadowListProps {
  blurLabel: string
  colorLabel: string
  onChange?: (value: Shadow[]) => void
  sizeLabel: string
  value?: Shadow[]
  xLabel: string
  yLabel: string
}

export default function ShadowList(props: ShadowListProps) {
  const {
    blurLabel,
    colorLabel,
    onChange,
    sizeLabel,
    value: values = [],
    xLabel,
    yLabel,
  } = props

  const onAdd = () => {
    onChange?.([...values, defaultShadow])
  }

  const onRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index)
    onChange?.(newValues)
  }

  const onValueChange = (
    index: number,
    position: number,
    newValue: number | string,
  ) => {
    const newValues = values.map((vec, i) => {
      if (i === index) {
        const newVec = [...vec] as Shadow
        newVec[position] = newValue
        return newVec
      }
      return vec
    })
    onChange?.(newValues)
  }

  return (
    <Flex direction='column' gap='size-200'>
      {values.map((vec3, index) => {
        const isLast = index === values.length - 1
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Flex key={index} direction='column' gap='size-200'>
            <Flex wrap alignItems='center' gap='size-200'>
              <Slider
                label={xLabel}
                maxValue={10}
                minValue={-10}
                value={vec3[0]}
                onChange={(value) => onValueChange(index, 0, value)}
              />
              <Slider
                label={yLabel}
                maxValue={10}
                minValue={-10}
                value={vec3[1]}
                onChange={(value) => onValueChange(index, 1, value)}
              />
              <Slider
                label={sizeLabel}
                maxValue={100}
                value={vec3[2]}
                onChange={(value) => onValueChange(index, 2, value)}
              />
              <Slider
                label={blurLabel}
                maxValue={100}
                value={vec3[3]}
                onChange={(value) => onValueChange(index, 3, value)}
              />
              <ColorPicker
                label={colorLabel}
                value={vec3[4]}
                onChange={(value) => onValueChange(index, 4, value.toString())}
              >
                <ColorEditor />
              </ColorPicker>
              {!isLast && (
                <Button variant='primary' onPress={() => onRemove(index)}>
                  <Remove />
                </Button>
              )}
              {isLast && (
                <Button variant='primary' onPress={onAdd}>
                  <Add />
                </Button>
              )}
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}
