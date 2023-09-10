/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import col = EmotionCommon.col
import hideScrollbar = EmotionCommon.hideScrollbar
import { SheetSnapPoints, SheetState, useBottomSheet } from './useBottomSheet'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useScrollbar } from '../Scrollbar/useScrollbar'
import Scrollbar from '../Scrollbar/Scrollbar'
import { ScrollbarStyle } from '../Scrollbar/ScrollbarStyle'
import centerAll = EmotionCommon.centerAll
import stretchAll = EmotionCommon.stretchAll
import row = EmotionCommon.row
import cmcss from 'src/styles/common.module.scss'
import ScrollbarOverlay from '../ScrollbarOverlay/ScrollbarOverlay';
import { ScrollbarOverlayStyle } from '../ScrollbarOverlay/ScrollbarOverlayStyle';



export type BottomSheetProps = {
  state: SheetState
  snapIdx: number
  setState: (action: SheetState)=>void
  setSnapIdx: (snapIdx: number)=>void
  animationDuration: number
  snapPoints: SheetSnapPoints
  setAnimationDuration: (value: number)=>void
}
const BottomSheet = (props: BottomSheetProps) => {
  let {
    state,
    setState,
    animationDuration,
    snapPoints,
    snapIdx,
    setSnapIdx,
    setAnimationDuration,
  } = props
  
  /*const actionHandler = useCallback<SheetActionEventHandler>(
    ev=>{
      if (ev.completed && !ev.success){
        switch (ev.action){
          case 'open': setAction('close'); break
          case 'close': setAction('open'); break
        }
      }
    },
    [state]
  )*/
  
  
  const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  /*
  useLayoutEffect(()=>{
    const el = bottomSheetHeaderRef.current!
    if (el){
      
      const onWheel = (ev: WheelEvent)=>{
        // @ts-ignore
        ev.needPrventDefault = true
        console.log('Header onWheel',ev)
      }
      
      el.addEventListener('wheel', onWheel, { passive: false })
      
      return ()=>{
        el.removeEventListener('wheel', onWheel)
      }
    }
  },[bottomSheetHeaderRef.current])
  */
  
  const { sheetProps, receivedSheetState, snapPointsPx } = useBottomSheet(
    bottomSheetFrameRef,
    bottomSheetRef,
    bottomSheetHeaderRef,
    contentRef,
    {
      state: state,
      setState: setState,
      //eventHandler: actionHandler,
      animationDuration,
      snapPoints: snapPoints,
      snapIdx: snapIdx,
      setSnapIdx: setSnapIdx,
    }
  )
  /*useEffect(()=>{
    console.log('sheet style',sheetProps.style)
  },[sheetProps.style])*/
  
  
  const {
    //containerProps,
    scrollbarProps,
    canScrollHorizontal,
    canScrollVertical,
  } = useScrollbar(scrollContainerRef, contentRef)
  
  
  
  
  const [openSnapIdx, setOpenSnapIdx] = useState(0)
  useEffect(()=>{
    if (['open','opening'].includes(state)) setOpenSnapIdx(snapIdx)
  },[state,snapIdx])
  
  
  const bgcDimHex = useMemo(()=>{
    return Math.trunc(
      Math.min(
        receivedSheetState.sheetH,
        snapPointsPx[openSnapIdx]
      ) / snapPointsPx[openSnapIdx]
      * 256 * 0.6
    ).toString(16).padStart(2, '0')
  },[snapPointsPx,openSnapIdx])
  
  
  const mainFrameRef = useRef<HTMLDivElement>(null)
  
  useLayoutEffect(()=>{
    const el = mainFrameRef.current
    if (el && state!=='closed'){
      const ups: Element[] = []
      let up = el.parentElement
      while (up) {
        ups.push(up)
        up = up.parentElement
      }
      ups.forEach(el=>el.classList.add(cmcss.noScroll))
      return ()=>ups.forEach(el=>el.classList.remove(cmcss.noScroll))
    }
  },[mainFrameRef.current, state])
  
  
  
  
  return <div
    css={css`
      position: fixed;
      inset: 0;
      pointer-events: none;
      ${stretchAll};
      
    `}
    ref={mainFrameRef}
    /*{ ...(state!=='closed' ? stopMoveEvents : {}) }*/
  >
    
    
    
      
    <div // Frame
      css={css`
        ${state !== 'closed'
                ? css`
                  pointer-events: auto;
                  background: #000000${bgcDimHex};
                `
                : css`
                  pointer-events: none;
                `
        }
        display: grid;
        place-items: end center;
        // padding from frame to sheet
        padding: 10px 10px 0 10px; // todo Must be

        //touch-action: none;
      `}
      ref={bottomSheetFrameRef}
      onPointerUp={() => setState('closing')}
    >
      <div
        css={css`
          display: contents;
        `}
        onPointerUp={ev => ev.stopPropagation()}
      >
        <div // Bottom Sheet
          css={css`
            display: grid;
            grid-template-rows: auto 1fr;
            width: 100%;
            border-radius: 16px 16px 0 0;
            overflow: hidden;

            pointer-events: auto; // todo Must be
            touch-action: none; // todo Must be
            max-height: 100%; // todo Must be
          `}
          ref={bottomSheetRef} // todo Must be
          {...sheetProps} // todo Must be
        >
          
          
          <div // Some Header Component
            css={t => css`
              background: ${t.page.bgc3[0]};
              color: ${t.page.text[0]};
              padding: 10px;
              ${col};
              align-items: center;
              gap: 6px;
              // todo must be without margins!!!
            `}
            ref={bottomSheetHeaderRef}
          >
            <div
              css={t => css`
                width: 60px;
                height: 4px;
                border-radius: 2px;
                background: ${t.page.bgc3[1]};
                ${state === 'dragging' && css`background: ${t.page.text[0]};`}
              `}
            />
            <div>Header</div>
          </div>
          
          <div // Pointer events consumer  // todo Must be
            css={css`
              display: contents;
            `}
            onPointerDown={ev => ev.stopPropagation()}
            onPointerMove={ev => ev.stopPropagation()}
            onPointerUp={ev => ev.stopPropagation()}
            onPointerCancel={ev => ev.stopPropagation()}
          >
            <div
              css={css`
                width: 100%;
                min-height: 0;
                ${centerAll};
              `}
            >
              
              <div // Some Body Component, Scroll Container
                css={t=>css`
                  place-self: stretch;
                  
                  ${hideScrollbar};
                  overflow-y: auto;
                  ${col};

                  background: ${t.page.bgc3[0]};
                  color: ${t.page.text[0]};

                  //overscroll-behavior: contain; // todo Must be
                  // todo must be without margins & paddings!!!
                `}
                ref={scrollContainerRef}
                //{...containerProps}
                /*onScroll={ev=>{
                 ev.stopPropagation()
                 ev.preventDefault()
                 }}*/
              >
                
                
                {/*<ScrollbarOverlay
                  css={ScrollbarOverlayStyle.page}
                >*/}
                
                  <div // scrollable content
                    css={css`
                      padding: 10px;
                      ${col};
                      height: auto;
                      min-height: auto;
                      // todo must be without margins!!!
                    `}
                    ref={contentRef}
                  >
                    
                    <option value=''>Не выбрано</option>
                    <option value='hetero'>Натурал</option>
                    <option value='pervert'>Извращуга</option>
                    {
                      [...Array(16).keys()]
                        .map(i => <div key={i}>Item {i+1}</div>)
                    }
                  </div>
                
                
                {/*</ScrollbarOverlay>*/}
                
                
              </div>
              
              <div
                css={css`
                  place-self: stretch;
                  display: grid;
                  pointer-events: none;
                  grid: '.. vs' 1fr
                      'hs ..' auto
                     / 1fr auto;
                `}
              >
                {canScrollVertical
                  && !['opening', 'closing', 'close', 'open', 'closed'].includes(state)
                  && <Scrollbar css={[
                    ScrollbarStyle.scrollbar, css`
                            &.rrainuiScrollbarTrack {
                              grid-area: vs;
                              place-self: start end;

                              &[data-direction=vertical] {
                                width: 20px;
                              }

                              pointer-events: auto;
                            }`]}
                    {...scrollbarProps}
                    direction="vertical"
                  />}
              </div>
            
            </div>
          </div>
        
        </div>
      </div>
    </div>
    
    
    <div
      css={css`
        pointer-events: auto;
        ${col};
        place-self: start start;
      `}
    >
      <div
        css={css`
          ${row};
          gap: 10px;
        `}
      >
        <button
          onClick={() => {
            setState('opening')
            let openIdx = snapPoints.findIndex(it => it === 'fit-content')
            if (openIdx === -1) openIdx = snapPoints.length - 1
            setSnapIdx(openIdx)
          }}
          css={css`
            width: 100%;
            height: 40px;
            font: 500 10px/129% Roboto;
            color: white;
          `}
        >
          Anim Open
        </button>
        <button
          onClick={() => setState('closing')}
          css={css`
            width: 100%;
            height: 40px;
            font: 500 10px/129% Roboto;
            color: white;
          `}
        >
          Anim Close
        </button>
        <button
          onClick={() => {
            setState('open')
            let openIdx = snapPoints.findIndex(it => it === 'fit-content')
            if (openIdx === -1) openIdx = snapPoints.length - 1
            setSnapIdx(openIdx)
          }}
          css={css`
            width: 100%;
            height: 40px;
            font: 500 10px/129% Roboto;
            color: white;
          `}
        >
          Open
        </button>
        <button
          onClick={() => setState('close')}
          css={css`
            width: 100%;
            height: 40px;
            font: 500 10px/129% Roboto;
            color: white;
          `}
        >
          Close
        </button>
      </div>
      
      
      <div
        css={css`
          ${row};
          gap: 10px;
        `}
      >
        {snapPoints.map((sp, i) => <button
          onClick={() => {
            setState('snap')
            setSnapIdx(i)
          }}
          css={css`
            width: 100%;
            height: 40px;
            font: 500 10px/129% Roboto;
            color: white;
          `}
        >
          Snap to {sp}
        </button>)}
      </div>
      
      
      <div
        css={css`
          ${row};
          gap: 10px;
        `}
      >
        {snapPoints.map((sp, i) => <button
          onClick={() => {
            setState('snapping')
            setSnapIdx(i)
          }}
          css={css`
            width: 100%;
            height: 40px;
            font: 500 10px/129% Roboto;
            color: white;
          `}
        >
          Anim Snap to {sp}
        </button>)}
      </div>
      
      
      <div
        css={css`
          ${row};
          gap: 10px;
        `}
      >
        <div>Animation duration ms:</div>
        <input value={animationDuration} onChange={ev => {
          let value = +ev.target.value
          if (isNaN(value) || value < 0) value = 3000
          setAnimationDuration(value)
        }}/>
      </div>
    
    
    </div>
    
    
  </div>
}
export default BottomSheet