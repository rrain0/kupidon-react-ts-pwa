/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { Pages } from 'src/components/Page/Pages'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { useContainerScrollState } from 'src/views/Scrollbar/useContainerScrollState'
import RootRoute = AppRoutes.RootRoute
import Page = Pages.Page
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
        bottom: var(--bottom-nav-height); right: 0; left: 0;
        height: calc(100dvh - var(--bottom-nav-height));
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

