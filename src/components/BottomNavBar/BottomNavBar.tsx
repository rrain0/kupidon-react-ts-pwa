/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import { RouteBuilder } from 'src/utils-react/route-builder/RouteBuilder'
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
  
  
  
  return <>
    
    <Frame>
      
      <NavLink to={RootRoute.profile[full]()}>
        <Button css={ButtonStyle.nav}>
          <ProfileIc/>
          <div>Профиль</div>
        </Button>
      </NavLink>
      
      <Button css={ButtonStyle.nav}>
        <ChatRoundIc/>
        <div>Чат</div>
      </Button>
      
      <NavLink to={RootRoute.main[full]()}>
        <Button css={ButtonStyle.nav}>
          <CardsHeartIc/>
          <div>Найти пары</div>
        </Button>
      </NavLink>
      
      <Button css={ButtonStyle.nav}>
        <HelpIc/>
        <div>Советы</div>
      </Button>
      
      <Button css={ButtonStyle.nav}
        onClick={()=>setSettingsOpen(true)}
      >
        <Gear2Ic/>
        <div>Настройки</div>
      </Button>
    
    </Frame>
    
    <QuickSettings open={settingsOpen} setOpen={setSettingsOpen}/>
    
  </>
}
export default BottomNavBar



const Frame = styled.nav`
  ${fixedBottom};
  height: 50px;
  min-height: 50px;
  ${row};
  justify-content: space-between;
  background: ${p=>p.theme.nav.bgc[0]};
`