/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import React, { ReactNode, useImperativeHandle, useRef } from 'react'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import SettingsButton from 'src/components/SettingsButton'
import UseBool from 'src/components/StateCarriers/UseBool'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import fixedBottom = EmotionCommon.fixedBottom
import Mem = ReactUtils.Mem
import Arrow5FwdIc = SimpleSvgIcons.Arrow5FwdIc
import row = EmotionCommon.row
import ArrowReloadIc = SimpleSvgIcons.ArrowReloadIc
import PartialUndef = TypeUtils.PartialUndef






export type BottomButtonBarProps = JSX.IntrinsicElements['section']
  & PartialUndef<{
    children: ReactNode
    backBtn: boolean
    settingsBtn: boolean
    refreshBtn: boolean
  }>
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
      <ButtonsContainer>
        
        {props.backBtn && <BackBtn/>}
        
        <CenterButtonsContainer>
          
          {props.children}
          
          {props.settingsBtn && <SettingsBtn/>}
          
        </CenterButtonsContainer>
        
        {props.refreshBtn && <RefreshBtn/>}
        
        
      </ButtonsContainer>
    </BottomButtonBar_>
    
  </>
})
export default Mem(BottomButtonBar)




const BottomButtonBar_ = styled.section`
  pointer-events: none;
  ${fixedBottom};
  display: grid;
  place-items: end stretch;
`
const ButtonsContainer = styled.div`
  pointer-events: none;
  height: var(--bottom-button-bar-height);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 10px;
  gap: 10px;
  &>*{
    pointer-events: auto;
  }
`
const CenterButtonsContainer = styled.div`
  pointer-events: none;
  height: 100%;
  ${row};
  align-items: center;
  gap: 10px;
  &>*{
    pointer-events: auto;
  }
`





const SettingsBtn = Mem(()=>{
  return <UseBool render={props=><>
    <SettingsButton onClick={props.setTrue}/>
    <QuickSettings open={props.value} setOpen={props.setValue}/>
  </>}/>
})


const BackBtn = Mem(()=>{
  return <Button css={[
    ButtonStyle.iconTranslucent,
    css`
      justify-self: start;
    `
  ]}
    onClick={undefined}
  >
    <Arrow5FwdIc css={css`rotate: 0.5turn;`} />
  </Button>
})


const RefreshBtn = Mem(()=>{
  return <Button css={[
    ButtonStyle.icon,
    css`
      justify-self: end;
    `
  ]}
    onClick={undefined}
  >
    <ArrowReloadIc />
  </Button>
})