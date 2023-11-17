/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import React, {
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react'
import { ButtonBarComponents } from 'src/components/BottomButtonBar/components'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Mem = ReactUtils.Mem
import PartialUndef = TypeUtils.PartialUndef
import BottomButtonBarFrame = ButtonBarComponents.BottomButtonBarFrame
import ButtonsContainer = ButtonBarComponents.ButtonsContainer
import LeftButtonsContainer = ButtonBarComponents.LeftButtonsContainer
import BackBtn = ButtonBarComponents.BackBtn
import CenterButtonsContainer = ButtonBarComponents.CenterButtonsContainer
import SettingsBtn = ButtonBarComponents.SettingsBtn
import RightButtonsContainer = ButtonBarComponents.RightButtonsContainer
import RefreshBtn = ButtonBarComponents.RefreshBtn






export type BottomButtonBarProps = JSX.IntrinsicElements['section']
  & PartialUndef<{
    children: ReactNode
    backBtn: boolean
    settingsBtn: boolean
    settingsBtnLeft: boolean
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
    
    <BottomButtonBarFrame
      {...props}
      ref={thisRef}
    >
      <ButtonsContainer>
        
        <LeftButtonsContainer>
          {props.backBtn && <BackBtn/>}
          {props.settingsBtnLeft && <SettingsBtn/>}
        </LeftButtonsContainer>
        
        
        <CenterButtonsContainer>
          
          {props.children}
          
          {props.settingsBtn && <SettingsBtn/>}
          
        </CenterButtonsContainer>
        
        
        <RightButtonsContainer>
          {props.refreshBtn && <RefreshBtn/>}
        </RightButtonsContainer>
        
      </ButtonsContainer>
    </BottomButtonBarFrame>
    
  </>
})
export default Mem(BottomButtonBar)



