/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar, {
  bottomButtonBarHeight,
} from 'src/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/components/Page/Pages'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import GearIc = SimpleSvgIcons.GearIc
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import SimplePage = Pages.SimplePage
import SimpleContent = Pages.SimpleContent




const TestPage = () => {
  const [searchParams] = useSearchParams()
  
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  return <>
      
    <SimplePage
      css={css`
        padding-bottom: calc(${bottomButtonBarHeight}px);
      `}
    >
      <SimpleContent>
    
      
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
        <Link to={RootRoute.test.moveElementToAnotherView[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.buttonPrimary}>Move to another view</Button>
        </Link>
        
        {/*<div
          css={css`
            min-height: 2000px;
            height: 2000px;
          `}
        />*/}
      
      
      </SimpleContent>
    </SimplePage>
    
    <BottomButtonBar>
      <Button css={ButtonStyle.iconTransparent}
        onClick={()=>setSettingsOpen(true)}
      >
        <GearIc/>
      </Button>
    </BottomButtonBar>
    
    
    <QuickSettings open={settingsOpen} setOpen={setSettingsOpen}/>
  
  </>
}
export default TestPage




