/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import classNames from 'classnames'
import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import UseFakePointerRef from 'src/components/ActionProviders/UseFakePointerRef'
import { BottomNavBarUiText } from 'src/components/BottomNavBar/uiText'
import UseBool from 'src/components/StateCarriers/UseBool'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import row = EmotionCommon.row
import CardsHeartIc = SvgIcons.CardsHeartIc
import ProfileIc = SvgIcons.ProfileIc
import Gear2Ic = SvgIcons.Gear2Ic
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import ChatRoundIc = SvgIcons.ChatRoundIc
import HelpIc = SvgIcons.HelpIc
import fixedBottom = EmotionCommon.fixedBottom
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import onPointerClick = ReactUtils.onPointerClick





const BottomNavBar =
React.memo(
()=>{
  
  const uiOptions = useUiTextContainer(BottomNavBarUiText)
  
  
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
      
      <NavLink to={RootRoute.findPairs[full]()}>
        <Button css={ButtonStyle.nav}>
          <CardsHeartIc/>
          <div>{uiOptions.findCouples[0].text}</div>
        </Button>
      </NavLink>
      
      <Button css={ButtonStyle.nav}>
        <HelpIc/>
        <div>{uiOptions.advices[0].text}</div>
      </Button>
      
      <UseBool>{bool=>
        <>
          <NavLink to={RootRoute.settings[full]()}
            onClick={ev=>ev.preventDefault()} // prevent follow link
          >
            <UseFakePointerRef>{({ ref })=>
              <Button css={ButtonStyle.nav}
                ref={ref as any}
                // onClick={bool.setTrue}
                {...onPointerClick(bool.setTrue)}
              >
                <Gear2Ic/>
                <div>{uiOptions.settings[0].text}</div>
              </Button>
            }</UseFakePointerRef>
          </NavLink>
          <QuickSettings open={bool.value} setOpen={bool.setValue}/>
        </>
      }</UseBool>
        
    
    </Frame>
    
  </>
})
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




