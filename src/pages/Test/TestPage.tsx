/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useLayoutEffect } from 'react'
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




const TestPage =
React.memo(
()=>{
  const [searchParams] = useSearchParams()
  
  
  useLayoutEffect(
    ()=>{
      const onLoad = (ev: Event)=>{
        console.log('page was loaded', ev)
        // @ts-ignore
        console.log('document.wasDiscarded',document.wasDiscarded)
      }
      const onFreeze = (ev: any)=>{
        console.log('page was frozen',ev)
      }
      const onResume = (ev: any)=>{
        console.log('page was resumed',ev)
      }
      const onVisibility = (ev: Event)=>{
        switch (document.visibilityState){
          case 'visible':
            console.log('page is visible',ev)
            break
          case 'hidden':
            console.log('page was hidden',ev)
            /* fetch('https://dev.kupidon.rrain.ydns.eu:50040/ktor/hello',{
              method: 'GET', mode: 'cors', cache: 'no-cache', credentials: 'same-origin',
            })
              .then(resp=>resp.text())
              .then(text=>console.log('response',text)) */
            break
        }
      }
      document.addEventListener('load',onLoad)
      document.addEventListener('visibilitychange',onVisibility)
      document.addEventListener('freeze',onFreeze)
      document.addEventListener('resume',onResume)
      return ()=>{
        document.addEventListener('load',onLoad)
        document.removeEventListener('freeze',onFreeze)
        document.removeEventListener('resume',onResume)
        document.addEventListener('visibilitychange',onVisibility)
      }
    },
    []
  )
  
  
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
            width: 300px;
            height: 150px;
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
            width: 300px;
            height: 150px;
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
            width: 300px;
            height: 150px;
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
})
export default TestPage




