/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useRef, useState } from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { PageScrollbarOverlayFrame } from 'src/components/Page/PageScrollbarOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import ProfileContent from 'src/pages/Profile/ProfileContent'
import { useRecoilState } from 'recoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { Navigate, useMatch, useSearchParams } from 'react-router-dom'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped;
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import FloppyDisk1Ic = SimpleSvgIcons.FloppyDisk1Ic
import ArrowReload = SimpleSvgIcons.ArrowReloadIc
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import path = RouteBuilder.path
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import fullAnySearchParams = RouteBuilder.fullAnySearchParams




// todo должен показывать инфу в зависимости от id в url
function ProfilePage(){
  const [searchParams] = useSearchParams()
  
  const [auth,setAuth] = useRecoilState(AuthRecoil)
  
  const update = async() => {
    try {
      const resp = await UserApi.current()
      setAuth(curr=>({ ...curr!, user: resp.data.user }))
    } catch (e) {
      console.warn(e)
    }
  }
  
  const urlUserId = useMatch(RootRoute.profile.id.userId[full]()+'/*')!
    .params[RootRoute.profile.id.userId[path].slice(1)]
  
  
  const [canSave, setCanSave] = useState(false)
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  
  // todo вынести в ProfileRouting
  if (!auth || auth.user.id!==urlUserId) return <Navigate
    to={RootRoute.login[fullAllowedNameParams]({
      returnPath: RootRoute.profile[fullAnySearchParams](searchParams)
    })}
    //replace={true}
  />
  
  
  return <>
    <Page
      ref={pageRef}
    >
      
      <ProfileContent setCanSave={setCanSave}/>
      
    </Page>
    
    
    
    <PageScrollbarOverlayFrame>
      <UseScrollbars
        containerIsWindow={true}
        contentRef={pageRef}
        render={(
          { canScrollVertical, canScrollHorizontal, ...scrollbarProps }
        )=><ScrollbarOverlay css={ScrollbarOverlayStyle.page}
          {...scrollbarProps}
          showVertical={canScrollVertical}
          showHorizontal={canScrollHorizontal}
        />}
      />
    </PageScrollbarOverlayFrame>
    
    
    <BottomButtonBar
      css={css`
        padding-bottom: var(--bottom-nav-height);
      `}
    >
      
      <Button css={ButtonStyle.icon}
        onClick={update}
        disabled={false}
      >
        <ArrowReload />
      </Button>
      
      <Button css={ButtonStyle.icon}
        onClick={undefined}
        disabled={!canSave}
      >
        <FloppyDisk1Ic />
      </Button>
    
    </BottomButtonBar>
    
  
  </>
}
export default ReactMemoTyped(ProfilePage)





