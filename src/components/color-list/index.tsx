import {
  Button,
  ColorEditor,
  ColorPicker,
  Flex,
  View,
} from '@adobe/react-spectrum'
import Add from '@spectrum-icons/workflow/Add'
import Remove from '@spectrum-icons/workflow/Remove'

export interface ColorListProps {
  defaultNewColor?: string
  label?: string
  onChange?: (value: string[]) => void
  value?: string[]
}

export const ColorList = (props: ColorListProps) => {
  const { defaultNewColor = '#666', label, onChange, value = [] } = props

  return (
    <Flex key={value.length} alignItems='center' gap='size-100' wrap='nowrap'>
      {value.map((itemValue, index) => {
        const isLast = index === value.length - 1
        return (
          // eslint-disable-next-line react/no-array-index-key
          <View key={index} position='relative'>
            <ColorPicker
              label={isLast && label}
              value={itemValue}
              onChange={(newValue) => {
                const values = [...value]
                values[index] = newValue.toString()
                onChange?.(values)
              }}
            >
              <ColorEditor />
            </ColorPicker>
            {!isLast && (
              <Button
                UNSAFE_className='absolute right-0 top-0 -translate-y-1/3 translate-x-1/2'
                UNSAFE_style={{
                  minBlockSize: 'unset',
                  padding: 0,
                }}
                height={16}
                variant='primary'
                width={16}
                onPress={() => onChange?.(value.filter((_, i) => i !== index))}
              >
                <Remove />
              </Button>
            )}
          </View>
        )
      })}
      {}
      <Button
        flex
        marginStart='size-100'
        variant='primary'
        onPress={() => onChange?.([defaultNewColor, ...value])}
      >
        <Add />
      </Button>
    </Flex>
  )
}
