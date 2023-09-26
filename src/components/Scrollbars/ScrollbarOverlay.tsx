import React, { HTMLAttributes } from 'react'
import { TypeUtils } from 'src/utils/TypeUtils'
import empty = TypeUtils.empty






export type ScrollbarOverlayProps = {
  showVertical?: boolean|empty
  showHorizontal?: boolean|empty
  children?: React.ReactNode
  className?: HTMLAttributes<any>['className']
  style?: HTMLAttributes<any>['style']
}
const ScrollbarOverlay = (props: ScrollbarOverlayProps)=>{


}
export default ScrollbarOverlay