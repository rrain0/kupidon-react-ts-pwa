/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/components/BottomButtonBar/TopButtonBar'
import { Pages } from 'src/components/Page/Pages'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import SimplePage = Pages.SimplePage
import SimpleContent = Pages.SimpleContent




const TestPage = () => {
  const [searchParams] = useSearchParams()
  
  
  return <>
      
    <SimplePage>
      <SimpleContent>
    
      
        <div>Test Page</div>
        
        <Link to={RootRoute.test.scrollbar[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.bigRectMain}>Scrollbar test</Button>
        </Link>
        <Link to={RootRoute.test.bottomSheet[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.bigRectMain}>Bottom Sheet test</Button>
        </Link>
        <Link to={RootRoute.test.resizeObserver[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.bigRectMain}>Resize Observer test</Button>
        </Link>
        <Link to={RootRoute.test.moveElementToAnotherView[fullAnySearchParams](searchParams)}>
          <Button css={ButtonStyle.bigRectMain}>Move to another view</Button>
        </Link>
        
        
        {/* <button
          onClick={()=>toast(<ToastBody type={'danger'}>TOASttt</ToastBody>)}
        >
          toast
        </button> */}
        
        
        {/*<div
          css={css`
            min-height: 2000px;
            height: 2000px;
          `}
        />*/}
        
        
        <div
          css={t=>css`
            width: 400px;
            height: 200px;
            padding: 10px;
            border-radius: 16px;
            background: ${t.ambience.normal.a.bgc[0]};
            color:      ${t.ambience.normal.a.content[0]};
          `}
        >
          Контент.<br/>
          Theme.ambience.normal.a
        </div>
        
        <div
          css={t=>css`
            width: 400px;
            height: 200px;
            padding: 10px;
            border-radius: 16px;
            background: ${t.ambience.normal.b.bgc[0]};
            color:      ${t.ambience.normal.b.content[0]};
          `}
        >
          Контент.<br/>
          Theme.ambience.normal.b
        </div>
        
        <div
          css={t=>css`
            width: 400px;
            height: 200px;
            padding: 10px;
            border-radius: 16px;
            background: ${t.ambience.accent.a.bgc[0]};
            color:      ${t.ambience.accent.a.content[0]};
          `}
        >
          Контент.<br/>
          Theme.ambience.accent.a
        </div>
        
        
        
        
        
      
      
      </SimpleContent>
    </SimplePage>
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar settingsBtn/>
    
    
  </>
}
export default TestPage




