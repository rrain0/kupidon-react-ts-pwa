/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from 'react';
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





const BottomSheetTestPage = ()=>{
  
  
  
  const [state, setState] =
    useState<SheetState>('closed')
  const [snapPoints, setSnapPoints] =
    useState<SheetSnapPoints>([0,200,'fit-content','50%','80%'])
  const [snapIdx,setSnapIdx] =
    useState(2)
  const [animationDuration, setAnimationDuration] =
    useState(300)
  const openSnapIdx = useMemo(()=>{
    let openIdx = snapPoints.findIndex(it=>it==='fit-content')
    if (openIdx===-1) openIdx = snapPoints.length-1
    return openIdx
  },[snapPoints])
  
  
  
  const [selectedItem, setSelectedItem] = useState('Выберите')
  
  
  
  return <Page>
    <PageContent>
      
      <div css={css`height: 200px;`}/>
      
      <div>Bottom Sheet Test Page</div>
      
      
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
      
      
      
      <div css={css`height: 1000px;`}/>
      
      
      
      <BottomSheet
        state={state}
        setState={setState}
        animationDuration={animationDuration}
        snapPoints={snapPoints}
        snapIdx={snapIdx}
        setSnapIdx={setSnapIdx}
        setAnimationDuration={setAnimationDuration}
        setSelectedItem={setSelectedItem}
      />
      
      
      <BottomSheetControlOverlay
        state={state}
        setState={setState}
        snapPoints={snapPoints}
        openSnapIdx={openSnapIdx}
        setSnapIdx={setSnapIdx}
        animationDuration={animationDuration}
        setAnimationDuration={setAnimationDuration}
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
      { props.snapPoints.map((sp, i) => <OverlayButton
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
      { props.snapPoints.map((sp, i) => <OverlayButton
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
          let value = +ev.target.value
          if (isNaN(value) || value < 0) value = 3000
          props.setAnimationDuration(value)
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
