/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import React, { ReactNode, useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import rowWrap = EmotionCommon.rowWrap
import fixedBottom = EmotionCommon.fixedBottom






export type BottomButtonBarProps = JSX.IntrinsicElements['section'] & {
  children?: ReactNode
}
const BottomButtonBar = React.forwardRef<HTMLTableSectionElement, BottomButtonBarProps>(
  (props, forwardedRef)=>{
  
  const thisRef = useRef<HTMLTableSectionElement>(null)
  useImperativeHandle(forwardedRef, ()=>thisRef.current!,[])
  
  return <>
    
    <Global
      styles={css`
        :root{
          --bottom-button-bar-height: 70px;
        }
      `}
    />
    
    <BottomButtonBar_
      {...props}
      ref={thisRef}
    >
      <BottomButtonsContainer>
        {props.children}
      </BottomButtonsContainer>
    </BottomButtonBar_>
    
  </>
})
export default BottomButtonBar




const BottomButtonBar_ = styled.section`
  ${fixedBottom};
  display: grid;
  place-items: end stretch;
  pointer-events: none;
`
const BottomButtonsContainer = styled.div`
  height: var(--bottom-button-bar-height);
  ${rowWrap};
  place-content: center;
  padding: 10px;
  gap: 10px;
  &>*{
    pointer-events: auto;
  }
`