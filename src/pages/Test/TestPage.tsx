/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/components/BottomButtonBar/TopButtonBar'
import { Pages } from 'src/components/Page/Pages'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import SimplePage = Pages.SimplePage
import SimpleContent = Pages.SimpleContent
import Mem = ReactUtils.Mem




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
            background: ${t.containerNormal.bgc[0]};
            color:      ${t.containerNormal.content[0]};
          `}
        >
          Контент.<br/>
          Theme.containerNormal
        </div>
        
        <div
          css={t=>css`
            width: 400px;
            height: 200px;
            padding: 10px;
            border-radius: 16px;
            background: ${t.containerNormal.bgc2[0]};
            color:      ${t.containerNormal.content[0]};
          `}
        >
          Контент.<br/>
          Theme.containerNormal2
        </div>
        
        <div
          css={t=>css`
            width: 400px;
            height: 200px;
            padding: 10px;
            border-radius: 16px;
            background: ${t.containerAccent.bgc[0]};
            color:      ${t.containerAccent.content[0]};
          `}
        >
          Контент.<br/>
          Theme.containerAccent
        </div>
        
        
        
        
        
      
      
      </SimpleContent>
    </SimplePage>
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar settingsBtn/>
    
    
  </>
}
export default Mem(TestPage)




