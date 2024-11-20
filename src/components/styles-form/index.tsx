import {
  ColorEditor,
  ColorPicker,
  SearchField,
  Slider,
} from '@adobe/react-spectrum'

import { FormField } from '@/components/form-field'
import { ICON_SIZE } from '@/constants'

import { ColorList } from '../color-list'
import ShadowList from '../shadow-list'
import { FormBlock } from '../styled'

export interface StylesFormProps {
  inModal?: boolean
}

export const StylesForm = (props: StylesFormProps) => {
  const { inModal } = props
  return (
    <div className='flex flex-wrap items-start gap-8'>
      <FormBlock>
        {!inModal && (
          <FormField name='searchText'>
            <SearchField />
          </FormField>
        )}
        <FormField name='iconSize'>
          <Slider label='Icon Size' maxValue={ICON_SIZE} minValue={64} />
        </FormField>
        <FormField name='iconRoute'>
          <Slider label='Icon Route' maxValue={360} minValue={0} />
        </FormField>
        <FormField name='iconColor'>
          <ColorPicker label='Icon Color'>
            <ColorEditor />
          </ColorPicker>
        </FormField>
      </FormBlock>
      <FormBlock>
        <FormField name='radius'>
          <Slider label='Radius' maxValue={ICON_SIZE / 2} />
        </FormField>
        <FormField name='backgroundColor'>
          <ColorList label='Background Color' />
        </FormField>
        <FormField name='backgroundDirection'>
          <Slider label='Background Direction' maxValue={360} />
        </FormField>
      </FormBlock>
      <FormBlock>
        <FormField name='borderSize'>
          <Slider label='Border Size' maxValue={30} />
        </FormField>
        <FormField name='borderColor'>
          <ColorList label='Border Color' />
        </FormField>
        <FormField name='borderDirection'>
          <Slider label='Border Direction' maxValue={360} />
        </FormField>
      </FormBlock>
      <FormBlock>
        <FormField name='shadow'>
          <ShadowList
            blurLabel='Shadow Blur'
            colorLabel='Shadow Color'
            sizeLabel='Shadow Size'
            xLabel='Shadow X'
            yLabel='Shadow Y'
          />
        </FormField>
      </FormBlock>
      <FormBlock>
        <FormField name='insetShadow'>
          <ShadowList
            blurLabel='Inset Shadow Blur'
            colorLabel='Inset Shadow Color'
            sizeLabel='Inset Shadow Size'
            xLabel='Inset Shadow X'
            yLabel='Inset Shadow Y'
          />
        </FormField>
      </FormBlock>
    </div>
  )
}
