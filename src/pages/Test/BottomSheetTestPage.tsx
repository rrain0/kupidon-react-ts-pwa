/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SimplePage } from 'src/components/Page/SimplePage'
import Page = SimplePage.Page
import PageContent = SimplePage.PageContent
import { SheetSnapPoints, SheetState } from 'src/components/BottomSheet/useBottomSheet'
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import row = EmotionCommon.row
import col = EmotionCommon.col
import { Utils } from 'src/utils/Utils'
import Setter = Utils.Setter
import styled from '@emotion/styled'
import BottomSheet from 'src/components/BottomSheet/BottomSheet'
import intOrDefault = Utils.nonNegIntOrDefault;
import ScrollbarOverlay from 'src/components/ScrollbarOverlay/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/ScrollbarOverlay/ScrollbarOverlayStyle'





const BottomSheetTestPage = ()=>{
  
  
  const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
  const bottomSheetContentRef = useRef<HTMLDivElement>(null)
  
  const [state, setState] =
    useState<SheetState>('closed')
  const [snapPoints, setSnapPoints] =
    useState<SheetSnapPoints>([0,200,'fit-content','50%','80%'])
  const [snapIdx,setSnapIdx] =
    useState(2)
  const [animationDuration, setAnimationDuration] =
    useState(400)
  const openSnapIdx = useMemo(()=>{
    let openIdx = snapPoints.findIndex(it=>it==='fit-content')
    if (openIdx===-1) openIdx = snapPoints.length-1
    return openIdx
  },[snapPoints])
  
  
  const [itemsCnt, setItemsCnt] = useState(12)
  
  const [selectedItem, setSelectedItem] = useState('Выберите')
  
  
  
  return <Page>
    <PageContent>
      
      <div css={css`height: 200px;`}/>
      
      <div>Bottom Sheet Test Page</div>
      
      <div
        css={css`
          ${row};
          gap: 10px;
        `}
      >
        <div>Number of items:</div>
        <OverlayInput
          value={itemsCnt}
          onChange={ev=>{
            setItemsCnt(intOrDefault(ev.target.value,12))
          }}
        />
      </div>
      
      
      <div
        css={t=>css`
          width: 200px;
          height: 50px;
          border-radius: 16px;
          border: 2px solid ${t.page.text[0]};
          ${row};
          padding: 0 10px;
          align-items: center;
          cursor: pointer;
        `}
        onClick={ev=>{
          setState('opening')
          setSnapIdx(openSnapIdx)
        }}
      >
        {selectedItem}
      </div>
      
      {
        [...Array(itemsCnt).keys()]
          .map(i=><div
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
          </div>)
      }
      
      
      
      <div css={css`height: 1000px;`}/>
      
      
      
      <BottomSheet
        bottomSheetFrameRef={bottomSheetFrameRef}
        bottomSheetRef={bottomSheetRef}
        bottomSheetHeaderRef={bottomSheetHeaderRef}
        bottomSheetContentRef={bottomSheetContentRef}
        draggableElements={[bottomSheetHeaderRef]}
        state={state}
        setState={setState}
        animationDuration={animationDuration}
        snapPoints={snapPoints}
        snapIdx={snapIdx}
        setSnapIdx={setSnapIdx}
      >
        <div // Header Component
          // Must be without margins!!!
          css={t=>css`
            background: ${t.page.bgc3[0]};
            border-radius: 16px 16px 0 0;
            color: ${t.page.text[0]};
            padding: 10px;
            ${col};
            align-items: center;
            gap: 6px;
          `}
          ref={bottomSheetHeaderRef as any}
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
              ref={bottomSheetContentRef as any}
            >
              {
                [...Array(itemsCnt).keys()]
                  .map(i=><div
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
                  </div>)
              }
            </div>
          </ScrollbarOverlay>
        </div>
      </BottomSheet>
      
      
      <BottomSheetControlOverlay
        state={state}
        setState={setState}
        snapPoints={snapPoints}
        openSnapIdx={openSnapIdx}
        setSnapIdx={setSnapIdx}
        animationDuration={animationDuration}
        setAnimationDuration={setAnimationDuration}
        itemsCnt={itemsCnt}
        setItemsCnt={setItemsCnt}
      />
      
    </PageContent>
  </Page>
}
export default BottomSheetTestPage




const BottomSheetControlOverlay = (props:{
  state: SheetState
  setState: Setter<SheetState>
  snapPoints: SheetSnapPoints
  openSnapIdx: number
  setSnapIdx: Setter<number>
  animationDuration: number
  setAnimationDuration: Setter<number>
  itemsCnt: number
  setItemsCnt: Setter<number>
})=>{
  return <div
    css={t=>css`
      position: fixed;
      top: 0; left: 0;
      ${col};
      background: ${t.page.bgc[0]}88;
    `}
  >
    <div
      css={css`
        ${row};
        gap: 10px;
      `}
    >
      <OverlayButton
        onClick={()=>{
          props.setState('opening')
          props.setSnapIdx(props.openSnapIdx)
        }}
      >
        Anim Open
      </OverlayButton>
      <OverlayButton
        onClick={()=>props.setState('closing')}
      >
        Anim Close
      </OverlayButton>
      <OverlayButton
        onClick={()=>{
          props.setState('open')
          props.setSnapIdx(props.openSnapIdx)
        }}
      >
        Open
      </OverlayButton>
      <OverlayButton
        onClick={()=>props.setState('close')}
      >
        Close
      </OverlayButton>
    </div>
    
    
    <div
      css={css`
          ${row};
          gap: 10px;
        `}
    >
      { props.snapPoints.map((sp, i)=><OverlayButton
        key={sp}
        onClick={() => {
          props.setState('snap')
          props.setSnapIdx(i)
        }}
      >
        Snap to {sp}
      </OverlayButton> )}
    </div>
    
    
    <div
      css={css`
        ${row};
        gap: 10px;
      `}
    >
      { props.snapPoints.map((sp, i)=><OverlayButton
        key={sp}
        onClick={() => {
          props.setState('snapping')
          props.setSnapIdx(i)
        }}
      >
        Anim Snap to {sp}
      </OverlayButton> )}
    </div>
    
    
    <div
      css={css`
        ${row};
        gap: 10px;
      `}
    >
      <div>Animation duration ms:</div>
      <OverlayInput
        value={props.animationDuration}
        onChange={ev=>{
          props.setAnimationDuration(
            intOrDefault(ev.target.value,400)
          )
        }}
      />
    </div>
    
    
    <div
      css={css`
        ${row};
        gap: 10px;
      `}
    >
      <div>Number of items:</div>
      <OverlayInput
        value={props.itemsCnt}
        onChange={ev=>{
          props.setItemsCnt(
            intOrDefault(ev.target.value,12)
          )
        }}
      />
    </div>
  
  
  </div>
}

const OverlayButton = styled.button`
  width: 100%;
  height: 30px;
  font: 500 10px/129% Roboto;
  color: ${p=>p.theme.page.text[0]};
`
const OverlayInput = styled.input`
  font: 500 10px/129% Roboto;
  color: ${p=>p.theme.page.text[0]};
`