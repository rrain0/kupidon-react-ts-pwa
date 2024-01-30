/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import ScrollbarsOverlay from 'src/components/Scrollbars/ScrollbarsOverlay'
import { ScrollbarsOverlayStyle } from 'src/components/Scrollbars/ScrollbarsOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import hideScrollbar = EmotionCommon.noScrollbars
import React, { useRef } from 'react'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import centerAll = EmotionCommon.centerAll
import { TypeUtils } from 'src/utils/common/TypeUtils'
import classNames from 'classnames'
import { isBrowser } from 'react-device-detect'
import PartialUndef = TypeUtils.PartialUndef
import ClassStyleProps = ReactUtils.ClassStyleProps
import fill = EmotionCommon.fill




export type OverflowWrapperProps = PartialUndef<{
  showVertical: boolean
  showHorizontal: boolean
  children: React.ReactNode
}> & ClassStyleProps


const OverflowWrapper =
React.memo(
(props: OverflowWrapperProps)=>{
  const showVertical = props.showVertical ?? true
  const showHorizontal = props.showHorizontal ?? true
  
  
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)
  
  
  return <div css={css`
    ${fill};
    ${centerAll};
    position: relative;
  `}
    className={classNames(props.className, 'rrainuiOverflowWrapper')}
    style={props.style}
  >
    
    
    {/*
     // Scrollable Content Container
     // must be without margins & paddings!!!
     */}
    <div css={css`
      ${col};
      //place-self: stretch;

      ${fill};

      overflow: auto;
      ${isBrowser && hideScrollbar};
    `}
      ref={scrollContainerRef}
      className={'rrainuiScrollContainer'}
    >
      {/*
       // Scrollable Content Wrapper
       // must be without margins & paddings - just content wrapper!!!
       */}
      <div css={css`
        display: flex;
        flex-flow: column nowrap;
        //min-width: fit-content; min-height: fit-content;
        width: fit-content; height: fit-content;
        //max-width: fit-content; max-height: fit-content;
        //overflow: visible;
      `}
        ref={scrollContentRef}
        className={'rrainuiScrollContentWrap'}
      >
        
        { props.children }
      
      </div>
    </div>
    
    
    { isBrowser &&
      <UseScrollbars
        containerRef={scrollContainerRef}
        contentRef={scrollContentRef}
        render={
          (scrollbarProps)=>
            <ScrollbarsOverlay css={ScrollbarsOverlayStyle.page}
              {...scrollbarProps}
              showVertical={showVertical}
              showHorizontal={showHorizontal}
            />
        }
      />
    }
    
  
  </div>
})
export default OverflowWrapper