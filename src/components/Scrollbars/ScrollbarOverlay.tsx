/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import classNames from 'classnames'
import React, { HTMLAttributes } from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Scrollbar from 'src/views/Scrollbar/Scrollbar'
import { ScrollbarStyle } from 'src/views/Scrollbar/ScrollbarStyle'
import { ScrollProps, SetScrollProps } from 'src/views/Scrollbar/useContainerScrollState'
import empty = TypeUtils.empty
import abs = EmotionCommon.abs






export type ScrollbarOverlayProps = {
  scrollProps: ScrollProps,
  setContainerScroll: SetScrollProps
  showVertical?: boolean|empty
  showHorizontal?: boolean|empty
  className?: HTMLAttributes<any>['className']
  style?: HTMLAttributes<any>['style']
}
const ScrollbarOverlay = (props: ScrollbarOverlayProps)=>{
  const showVertical = props.showVertical ?? true
  const showHorizontal = props.showHorizontal ?? true

  
  return <div // Scrollbar Overlay
    css={css`
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
    
    { showVertical && <Scrollbar
      css={[ScrollbarStyle.scrollbar, css`
          &.rrainuiScrollbarTrack {
            grid-area: vs;
            place-self: stretch end;
            &[data-direction=vertical] {
              height: auto;
              width: 20px;
            }
            pointer-events: auto;
        }`]}
      scrollProps={props.scrollProps}
      setContainerScroll={props.setContainerScroll}
      direction="vertical"
    /> }
    
    { showHorizontal && <Scrollbar
      css={[ScrollbarStyle.scrollbar, css`
          &.rrainuiScrollbarTrack {
            grid-area: hs;
            place-self: end stretch;
            &[data-direction=horizontal]{
              height: 20px;
              width: auto;
            }
            pointer-events: auto;
          }`
      ]}
      scrollProps={props.scrollProps}
      setContainerScroll={props.setContainerScroll}
      direction='horizontal'
    /> }
  
  </div>
}
export default ScrollbarOverlay