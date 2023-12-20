/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import classNames from 'classnames'
import React, { HTMLAttributes } from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Scrollbar from 'src/views/Scrollbar/Scrollbar'
import { ScrollbarStyle } from 'src/views/Scrollbar/ScrollbarStyle'
import { ScrollProps, SetScrollProps } from 'src/views/Scrollbar/useContainerScrollState'
import abs = EmotionCommon.abs
import PartialUndef = TypeUtils.PartialUndef





export type ScrollbarsOverlayProps = {
  scrollProps: ScrollProps,
  setContainerScroll: SetScrollProps
} & PartialUndef<{
  canScrollHorizontally: boolean
  canScrollVertically: boolean
  showVertical: boolean
  showHorizontal: boolean
  className: HTMLAttributes<any>['className']
  style: HTMLAttributes<any>['style']
}>


const ScrollbarsOverlay =
React.memo(
(props: ScrollbarsOverlayProps)=>{
  const showVertical = (props.canScrollVertically ?? true) && (props.showVertical ?? true)
  const showHorizontal = (props.canScrollHorizontally ?? true) && (props.showHorizontal ?? true)
  
  
  
  return <div css={css` // Scrollbar Overlay
    ${abs};
    display: grid;
    pointer-events: none;
    grid: '.. vs' 1fr
          'hs ..' auto
        / 1fr auto;
  `}
    className={classNames(props.className, 'rrainuiScrollbarOverflow')}
    style={props.style}
  >
    
    { showVertical &&
    <Scrollbar css={[ScrollbarStyle.scrollbar, css`
      &.rrainuiScrollbarTrack {
        grid-area: vs;
        place-self: stretch end;
        &[data-direction=vertical] {
          height: auto;
          width: 20px;
        }
        pointer-events: auto;
      }
    `]}
      scrollProps={props.scrollProps}
      setContainerScroll={props.setContainerScroll}
      direction="vertical"
    /> }
    
    { showHorizontal &&
      <Scrollbar css={[ScrollbarStyle.scrollbar, css`
        &.rrainuiScrollbarTrack {
          grid-area: hs;
          place-self: end stretch;
          &[data-direction=horizontal]{
            height: 20px;
            width: auto;
          }
          pointer-events: auto;
        }
      `]}
      scrollProps={props.scrollProps}
      setContainerScroll={props.setContainerScroll}
      direction='horizontal'
    /> }
  
  </div>
})
export default ScrollbarsOverlay