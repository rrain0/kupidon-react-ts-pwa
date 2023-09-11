/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import { SheetSnapPoints, SheetState, useBottomSheet } from './useBottomSheet'
import React, {
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import ScrollbarOverlay from 'src/components/ScrollbarOverlay/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/ScrollbarOverlay/ScrollbarOverlayStyle'



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
  
  
  const { receivedSheetState, snapPointsPx } = useBottomSheet(
    bottomSheetFrameRef,
    bottomSheetRef,
    bottomSheetHeaderRef,
    bottomSheetContentRef,
    [bottomSheetHeaderRef],
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
    ).toString(16).padStart(2,'0')
  },[snapPointsPx,openSnapIdx])
  
  
  
  
  return <div // Frame
    css={css`
      position: fixed;
      inset: 0;
      ${state !== 'closed'
        ? css`
          pointer-events: auto;
          background: #000000${bgcDimHex};
          will-change: background;
        `
        : css`
          pointer-events: none;
        `
      }
      display: grid;
      place-items: end center;
      
      // padding from frame to sheet
      //padding: 4px 4px 0 4px;

      //touch-action: none;
    `}
    ref={bottomSheetFrameRef}
    onPointerUp={(ev)=>{
      // todo
      setState('closing')
    }}
  >
    <div
      css={css`display: contents;`}
      onPointerUp={ev => ev.stopPropagation()}
    >
      <div // Bottom Sheet
        css={css`
          display: grid;
          grid-template-rows: auto 1fr;
          justify-items: stretch;
          width: 100%;
          border-radius: 16px 16px 0 0;
          overflow: hidden;

          will-change: height; // Must be
          touch-action: none; // Must be
          max-height: 100%; // Must be
        `}
        ref={bottomSheetRef} // Must be
      >
        
        
        <div // Header Component
          // Must be without margins!!!
          css={t=>css`
            background: ${t.page.bgc3[0]};
            color: ${t.page.text[0]};
            padding: 10px;
            ${col};
            align-items: center;
            gap: 6px;
          `}
          ref={bottomSheetHeaderRef}
        >
          <div
            css={t=>css`
              width: 60px;
              height: 4px;
              border-radius: 2px;
              background: ${t.page.bgc3[1]};
              ${state==='dragging' && css`background: ${t.page.text[0]};`}
            `}
          />
          <div>Header</div>
        </div>
        
        
        
        
        
        <div // Body Component
          // Must be without margins & paddings!!!
          css={t=>css`
            display: flex;
            place-items: center;
            overflow: hidden;
            background: ${t.page.bgc3[0]};
            color: ${t.page.text[0]};
          `}
        >
          
          
          <ScrollbarOverlay
            css={ScrollbarOverlayStyle.page}
            showVertical={
              !['opening','closing','open','close','closed'].includes(state)
            }
          >
          
            <div // scrollable content
              // Must be without margins!!!
              css={css`
                width: 100%;
                padding: 10px;
                ${col};
                gap: 10px;
                height: fit-content;
                min-height: fit-content;
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
}
export default BottomSheet