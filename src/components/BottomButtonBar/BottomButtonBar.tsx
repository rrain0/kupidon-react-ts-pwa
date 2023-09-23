/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import abs = EmotionCommon.abs
import rowWrap = EmotionCommon.rowWrap




export type BottomButtonBarProps = {
  children?: ReactNode
}
const BottomButtonBar = (props: BottomButtonBarProps)=>{
  return <BottomButtonBar_>
    <BottomButtonsContainer>
      {props.children}
    </BottomButtonsContainer>
  </BottomButtonBar_>
}
export default BottomButtonBar




const BottomButtonBar_ = styled.section`
  ${abs};
  //z-index: 20;
  display: grid;
  place-items: end stretch;
  pointer-events: none;
`
const BottomButtonsContainer = styled.div`
  ${rowWrap};
  place-content: center;
  padding: 10px;
  gap: 10px;
  &>*{
    pointer-events: auto;
  }
`
