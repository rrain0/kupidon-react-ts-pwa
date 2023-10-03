/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { BottomNavBarUiOptions } from 'src/components/BottomNavBar/BottomNavBarUiOptions'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import { useUiOptionsContainer } from 'src/utils/lang/useUiOptions'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import row = EmotionCommon.row
import CardsHeartIc = SimpleSvgIcons.CardsHeartIc
import ProfileIc = SimpleSvgIcons.ProfileIc
import Gear2Ic = SimpleSvgIcons.Gear2Ic
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import ChatRoundIc = SimpleSvgIcons.ChatRoundIc
import HelpIc = SimpleSvgIcons.HelpIc
import fixedBottom = EmotionCommon.fixedBottom




export const bottomNavBarHeight = 50;

const BottomNavBar = ()=>{
  
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  const uiOptions = useUiOptionsContainer(BottomNavBarUiOptions)
  
  return <>
    
    <Frame>
      
      <NavLink to={RootRoute.profile[full]()}>
        <Button css={ButtonStyle.nav}>
          <ProfileIc/>
          <div>{uiOptions.profile[0].text}</div>
        </Button>
      </NavLink>
      
      <Button css={ButtonStyle.nav}>
        <ChatRoundIc/>
        <div>{uiOptions.chat[0].text}</div>
      </Button>
      
      <NavLink to={RootRoute.main[full]()}>
        <Button css={ButtonStyle.nav}>
          <CardsHeartIc/>
          <div>{uiOptions.findCouples[0].text}</div>
        </Button>
      </NavLink>
      
      <Button css={ButtonStyle.nav}>
        <HelpIc/>
        <div>{uiOptions.advices[0].text}</div>
      </Button>
      
      <Button css={ButtonStyle.nav}
        onClick={()=>setSettingsOpen(true)}
      >
        <Gear2Ic/>
        <div>{uiOptions.settings[0].text}</div>
      </Button>
    
    </Frame>
    
    <QuickSettings open={settingsOpen} setOpen={setSettingsOpen}/>
    
  </>
}
export default BottomNavBar



const Frame = styled.nav`
  ${fixedBottom};
  height: ${bottomNavBarHeight}px;
  min-height: ${bottomNavBarHeight}px;
  ${row};
  justify-content: space-between;
  background: ${p=>p.theme.nav.bgc[0]};
`