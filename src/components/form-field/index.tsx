import React from 'react'

import { useSelector } from '@/context'

export interface FormFieldProps {
  children: React.ReactElement
  eventName?: string
  name: string
  path?: number[]
  valueName?: string
}

export const FormField = (props: FormFieldProps) => {
  const { children, eventName = 'onChange', name, valueName = 'value' } = props
  const [value, setValue] = useSelector(
    (state) => state[name as keyof typeof state],
  )

  return React.cloneElement(children, {
    [eventName]: setValue,
    [valueName]: value,
  })
}
