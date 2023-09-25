/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { SimplePage } from 'src/components/Page/SimplePage'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import { SimpleGradientBgc } from 'src/styles/bgc/SimpleGradientBgc'
import { RouteBuilder } from 'src/utils-react/route-builder/RouteBuilder'
import Page = SimplePage.Page
import PageContent = SimplePage.PageContent
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import GearIc = SimpleSvgIcons.GearIc
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import PageContentFrame = SimplePage.PageContentFrame
import PageFrame = SimplePage.PageFrame




const TestPage = () => {
  const [searchParams] = useSearchParams()
  
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  return <>
    <PageFrame>
      
      <Page>
        
        <PageContentFrame>
          <PageContent
            css={t=>css`
          ${SimpleGradientBgc(t)};
          height: auto;
          max-height: fit-content;
        `}
          >
            
            <div>Test Page</div>
            
            <Link to={RootRoute.test.scrollbar[fullAnySearchParams](searchParams)}>
              <Button css={ButtonStyle.buttonPrimary}>Scrollbar test</Button>
            </Link>
            <Link to={RootRoute.test.bottomSheet[fullAnySearchParams](searchParams)}>
              <Button css={ButtonStyle.buttonPrimary}>Bottom Sheet test</Button>
            </Link>
            <Link to={RootRoute.test.resizeObserver[fullAnySearchParams](searchParams)}>
              <Button css={ButtonStyle.buttonPrimary}>Resize Observer test</Button>
            </Link>
            
            {/*<div
              css={css`
                min-height: 2000px;
                height: 2000px;
              `}
            />*/}
            
            <div css={css`height: calc(-50px + 70px);`}/>
          
          </PageContent>
        </PageContentFrame>
      
      </Page>
      
      <BottomButtonBar>
        <Button css={ButtonStyle.iconTransparent}
          onClick={()=>setSettingsOpen(true)}
        >
          <GearIc/>
        </Button>
      </BottomButtonBar>
      
    </PageFrame>
    
    <QuickSettings open={settingsOpen} setOpen={setSettingsOpen}/>
  
  </>
}
export default TestPage




