/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import col = EmotionCommon.col
import { SheetSnapPoints, SheetState, useBottomSheet } from './useBottomSheet'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import stretchAll = EmotionCommon.stretchAll
import cmcss from 'src/styles/common.module.scss'
import ScrollbarOverlay from '../ScrollbarOverlay/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from '../ScrollbarOverlay/ScrollbarOverlayStyle'
import row = EmotionCommon.row;



export type BottomSheetProps = {
  state: SheetState
  snapIdx: number
  setState: (action: SheetState)=>void
  setSnapIdx: (snapIdx: number)=>void
  animationDuration: number
  snapPoints: SheetSnapPoints
  setAnimationDuration: (value: number)=>void
  
  setSelectedItem: (value: string)=>void
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
    setSelectedItem,
  } = props
  
  
  
  const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
  const bottomSheetContentRef = useRef<HTMLDivElement>(null)
  
  
  const { sheetProps, receivedSheetState, snapPointsPx } = useBottomSheet(
    bottomSheetFrameRef,
    bottomSheetRef,
    bottomSheetHeaderRef,
    bottomSheetContentRef,
    {
      state: state,
      setState: setState,
      animationDuration,
      snapPoints: snapPoints,
      snapIdx: snapIdx,
      setSnapIdx: setSnapIdx,
    }
  )
  
  
  
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
      const x: Element[] = []
      const y: Element[] = []
      let up = el.parentElement
      while (up) {
        if (['auto','scroll'].includes(
          up.computedStyleMap().get('overflow-x') as any
        )) x.push(up)
        if (['auto','scroll'].includes(
          up.computedStyleMap().get('overflow-y') as any
        )) y.push(up)
        up = up.parentElement
      }
      x.forEach(el=>el.classList.add(cmcss.noScrollX))
      y.forEach(el=>el.classList.add(cmcss.noScrollY))
      return ()=>{
        x.forEach(el=>el.classList.remove(cmcss.noScrollX))
        y.forEach(el=>el.classList.remove(cmcss.noScrollY))
      }
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
        padding: 4px 4px 0 4px; // todo Must be

        //touch-action: none;
      `}
      ref={bottomSheetFrameRef}
      onPointerUp={(ev)=>{
        // todo
        setState('closing')
      }}
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
            //grid: '.' auto '.' 1fr / stretch;
            justify-items: stretch;
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
            css={t=>css`
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
            css={css`display: contents;`}
            onPointerDown={ev=>ev.stopPropagation()}
            onPointerMove={ev=>ev.stopPropagation()}
            onPointerUp={ev=>ev.stopPropagation()}
            onPointerCancel={ev=>ev.stopPropagation()}
          >
          
            
            <div // Some Body Component, Scroll Container
              css={t=>css`
                display: flex;
                place-items: center;
                overflow: hidden;
                background: ${t.page.bgc3[0]};
                color: ${t.page.text[0]};
                // todo must be without margins & paddings!!!
              `}
            >
              
              
              <ScrollbarOverlay
                css={ScrollbarOverlayStyle.page}
                showVertical={!['opening','closing','close','open','closed'].includes(state)}
              >
              
                <div // scrollable content
                  css={css`
                    width: 100%;
                    padding: 10px;
                    ${col};
                    gap: 10px;
                    height: fit-content;
                    min-height: fit-content;
                    // todo must be without margins!!!
                  `}
                  ref={bottomSheetContentRef}
                >
                  
                  {
                    [...Array(16).keys()]
                      .map(i=>
                        <div
                          css={css`
                            cursor: pointer;
                          `}
                          key={i}
                          onClick={()=>{
                            setSelectedItem(`Item ${i+1}`)
                            setState('closing')
                          }}
                        >
                          Item {i+1}
                        </div>
                      )
                  }
                </div>
              
              
              </ScrollbarOverlay>
              
              
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