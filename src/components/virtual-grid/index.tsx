import { useDeferredValue, useEffect, useRef, useState } from 'react'

import { Content, Heading, IllustratedMessage } from '@adobe/react-spectrum'
import NoSearchResults from '@spectrum-icons/illustrations/NoSearchResults'
import * as Icons from '@tabler/icons-react'
import { useVirtualizer } from '@tanstack/react-virtual'
import clsx from 'clsx'
import { throttle } from 'lodash-es'

import { ICON_SIZE } from '@/constants'
import { useSelector } from '@/context'
import useStyles from '@/hooks/useStyles'

import { IconCard } from '../icon-card'

import type { Icon } from '@tabler/icons-react'

const iconList = Object.keys(Icons).filter(
  (name) => '$$typeof' in Icons[name as keyof typeof Icons],
)

export interface VirtualGridProps
  extends Omit<React.ComponentProps<'div'>, 'children'> {
  gap: number
  itemHeight: number
}

export function VirtualGrid(props: VirtualGridProps) {
  const { className, gap, itemHeight } = props
  const parentRef = useRef<HTMLDivElement>(null)
  const searchText = useSelector((state) => state.searchText[0])
  const [columnCount, setColumnCount] = useState(4)
  const deferredSearchText = useDeferredValue(searchText)

  const { iconColor, iconRoute, iconSize } = useStyles()
  const setIconName = useSelector((state) => state.iconName[1])

  const renderList = iconList.filter((name) =>
    name.toLowerCase().includes(deferredSearchText.toLowerCase()),
  )

  useEffect(() => {
    const updateColumnCount = () => {
      const itemTotalWidth = itemHeight + gap
      const availableWidth =
        parentRef.current!.getBoundingClientRect().width - gap
      const columns = Math.max(1, Math.floor(availableWidth / itemTotalWidth))
      setColumnCount(columns)
    }

    updateColumnCount()
    const throttledUpdateColumnCount = throttle(updateColumnCount, 100)

    const resizeObserver = new ResizeObserver(throttledUpdateColumnCount)

    resizeObserver.observe(parentRef.current!)
    window.addEventListener('resize', throttledUpdateColumnCount)
    return () => {
      window.removeEventListener('resize', throttledUpdateColumnCount)
      resizeObserver.disconnect()
    }
  }, [itemHeight, gap])

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(renderList.length / columnCount),
    estimateSize: () => itemHeight + gap,
    getScrollElement: () => parentRef.current,
    overscan: 2,
  })

  if (renderList.length === 0) {
    return (
      <IllustratedMessage>
        <NoSearchResults />
        <Heading>No matching results</Heading>
        <Content>Try another search.</Content>
      </IllustratedMessage>
    )
  }

  return (
    <div ref={parentRef} className={clsx('overflow-y-scroll p-8', className)}>
      <div
        className='relative w-full'
        style={{
          height: `${rowVirtualizer.getTotalSize() - gap}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            className='absolute left-0 top-0 grid w-full'
            style={{
              gap,
              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
              height: `${itemHeight}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {renderList
              .slice(
                virtualRow.index * columnCount,
                (virtualRow.index + 1) * columnCount,
              )
              .map((iconName) => {
                const Component = Icons[iconName as keyof typeof Icons] as Icon
                return (
                  <div
                    key={iconName}
                    className='flex items-center justify-center'
                    style={{ height: itemHeight }}
                  >
                    <div
                      className='cursor-pointer'
                      role='button'
                      style={{ height: ICON_SIZE, width: ICON_SIZE }}
                      tabIndex={0}
                      title={iconName}
                      onClick={() => setIconName(iconName)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          setIconName(iconName)
                        }
                      }}
                    >
                      <IconCard key={iconName}>
                        <Component
                          style={{
                            color: iconColor,
                            height: iconSize,
                            transform: `rotate(${iconRoute}deg)`,
                            width: iconSize,
                          }}
                        />
                      </IconCard>
                    </div>
                  </div>
                )
              })}
          </div>
        ))}
      </div>
    </div>
  )
}
