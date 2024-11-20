import { useState } from 'react'

import { createContextFactory } from '@reactils/create-context-factory'

export type Shadow = [number, number, number, number, string]

export const defaultShadow: Shadow = [0, 0, 0, 0, '#000']

const [Provider, useSelector] = createContextFactory(() => ({
  backgroundColor: useState(['#000']),
  backgroundDirection: useState(180),
  borderColor: useState(['#333']),
  borderDirection: useState(180),
  borderSize: useState(0),
  iconColor: useState('#fff'),
  iconName: useState<null | string>(null),
  iconRoute: useState(0),
  iconSize: useState(128),
  insetShadow: useState<Shadow[]>([defaultShadow]),
  isDrawerOpen: useState(false),
  radius: useState(64),
  searchText: useState(''),
  shadow: useState<Shadow[]>([defaultShadow]),
}))

export { Provider, useSelector }
