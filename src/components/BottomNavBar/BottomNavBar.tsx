/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import classNames from 'classnames'
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





const BottomNavBar = ()=>{
  
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  const uiOptions = useUiOptionsContainer(BottomNavBarUiOptions)
  
  return <>
    
    <Global
      styles={css`
        :root{
          --bottom-nav-padding-bottom: max(calc(env(safe-area-inset-bottom, 0px) - 10px), 0px);
          --bottom-nav-height: calc(50px + var(--bottom-nav-padding-bottom));
        }
      `}
    />
    
    <Frame
      className={classNames('rrainuiBottomNavBar')}
    >
      
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
  height: var(--bottom-nav-height);
  min-height: var(--bottom-nav-height);
  padding-bottom: var(--bottom-nav-padding-bottom);
  ${row};
  justify-content: space-between;
  background: ${p=>p.theme.nav.bgc[0]};
`



