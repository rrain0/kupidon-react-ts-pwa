/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar, { bottomButtonBarHeight } from 'src/components/BottomButtonBar/BottomButtonBar'
import { bottomNavBarHeight } from 'src/components/BottomNavBar/BottomNavBar'
import { Pages } from 'src/components/Page/Pages'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import { useContainerScrollState } from 'src/views/Scrollbar/useContainerScrollState'
import RootRoute = AppRoutes.RootRoute
import fill = EmotionCommon.fill
import Page = Pages.Page
import GearIc = SimpleSvgIcons.GearIc
import col = EmotionCommon.col
import full = RouteBuilder.full
import SimpleContent = Pages.SimpleContent



function MainPage(){
  
  /* const [settingsOpen, setSettingsOpen] = useState(false) */
  
  const pageRef = useRef<HTMLElement>(null)
  
  const {
    canScrollHorizontal,
    canScrollVertical,
    ...scrollbarProps
  } = useContainerScrollState({
    containerIsWindow: true,
    contentRef: pageRef,
  })
  
  return <>
    <Page
      ref={pageRef}
      css={css`
        padding-bottom: calc(${bottomNavBarHeight}px + ${bottomButtonBarHeight}px);
      `}
    >
      <SimpleContent>
        
        <Link to={RootRoute.profile[full]()}>
          <button>Профиль</button>
        </Link>
        <Link to={RootRoute.test[full]()}>
          <button>Test Page</button>
        </Link>
        <div>Какая-то главная страница.</div>
        <div>Здесь будут карточки людей.</div>
        
      </SimpleContent>
    </Page>
    
    
    <div
      css={css`
        position: fixed;
        bottom: ${bottomNavBarHeight}px; right: 0; left: 0;
        height: calc(100dvh - ${bottomNavBarHeight}px);
        pointer-events: none;
      `}
    >
      <ScrollbarOverlay css={ScrollbarOverlayStyle.page}
        {...scrollbarProps}
        showVertical={canScrollVertical}
        showHorizontal={canScrollHorizontal}
      />
    </div>
    
    
    {/* <BottomButtonBar
      css={css`
        padding-bottom: ${bottomNavBarHeight}px;
      `}>
      <Button css={ButtonStyle.iconTransparent}
        onClick={()=>setSettingsOpen(true)}
      >
        <GearIc/>
      </Button>
    </BottomButtonBar> */}
    
    {/* <QuickSettings open={settingsOpen} setOpen={setSettingsOpen}/> */}
    
  </>
}
export default MainPage

