/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { SimplePage } from 'src/components/Page/SimplePage'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import { RouteBuilder } from 'src/utils-react/route-builder/RouteBuilder'
import Page = SimplePage.Page
import PageContent = SimplePage.PageContent
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import GearIc = SimpleSvgIcons.GearIc
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams




const TestPage = () => {
  const [searchParams] = useSearchParams()
  
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  return <>
    <Page>
      <PageContent>
      
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
      
      </PageContent>
      
      <BottomButtonBar>
        <Button css={ButtonStyle.iconTransparent}
          onClick={() => setSettingsOpen(true)}
        >
          <GearIc/>
        </Button>
      </BottomButtonBar>
    
    </Page>
    
    <QuickSettings open={settingsOpen} setOpen={setSettingsOpen}/>
  
  </>
}
export default TestPage




