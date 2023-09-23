/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import RootRoutes = AppRoutes.RootRoutes
import { SimplePage } from 'src/components/Page/SimplePage'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import Page = SimplePage.Page
import PageContent = SimplePage.PageContent
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import GearIc = SimpleSvgIcons.GearIc




const TestPage = () => {
  const [searchParams] = useSearchParams()
  
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  return <>
    <Page>
      <PageContent>
      
      <div>Test Page</div>
    
      <Link to={RootRoutes.test.scrollbar.fullPath3({ urlSearchParams: searchParams })}>
        <Button css={ButtonStyle.buttonPrimary}>Scrollbar test</Button>
      </Link>
      <Link to={RootRoutes.test.bottomSheet.fullPath3({ urlSearchParams: searchParams })}>
        <Button css={ButtonStyle.buttonPrimary}>Bottom Sheet test</Button>
      </Link>
      <Link to={RootRoutes.test.resizeObserver.fullPath3({ urlSearchParams: searchParams })}>
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




