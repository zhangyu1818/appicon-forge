import { useDeferredValue } from 'react'

import { useSelector } from '@/context'

const useStyles = () => {
  const styles = useSelector((state) => {
    return {
      backgroundColor: state.backgroundColor[0],
      backgroundDirection: state.backgroundDirection[0],
      borderColor: state.borderColor[0],
      borderDirection: state.borderDirection[0],
      borderSize: state.borderSize[0],
      iconColor: state.iconColor[0],
      iconRoute: state.iconRoute[0],
      iconSize: state.iconSize[0],
      insetShadow: state.insetShadow[0],
      radius: state.radius[0],
      shadow: state.shadow[0],
    }
  })
  return useDeferredValue(styles)
}

export default useStyles
