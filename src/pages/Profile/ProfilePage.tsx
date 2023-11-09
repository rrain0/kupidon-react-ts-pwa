/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { PageScrollbarOverlayFrame } from 'src/components/Page/PageScrollbarOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import ProfileContent from 'src/pages/Profile/ProfileContent'
import { useRecoilState } from 'recoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import ReactMemoTyped = ReactUtils.Mem
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import FloppyDisk1Ic = SimpleSvgIcons.FloppyDisk1Ic
import ArrowReload = SimpleSvgIcons.ArrowReloadIc





function ProfilePage(){
  
  const [,setAuth] = useRecoilState(AuthRecoil)
  
  
  const update = async() => {
    try {
      const resp = await UserApi.current()
      setAuth(curr=>({ ...curr!, user: resp.data.user }))
    } catch (e) {
      console.warn(e)
    }
  }
  
  
  useEffect(
    ()=>void update(),
    []
  )
  
  
  const [canSubmit, setCanSubmit] = useState(false)
  const [submitCallback, setSubmitCallback] = useState(
    undefined as (()=>()=>void) | undefined
  )
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  
  
  
  return <>
    <Page
      ref={pageRef}
    >
      
      <ProfileContent
        setCanSubmit={setCanSubmit}
        setSubmitCallback={setSubmitCallback}
      />
      
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
      
      {/* <Button css={ButtonStyle.icon}
        onClick={update}
        disabled={false}
      >
        <ArrowReload />
      </Button> */}
      
      <Button css={ButtonStyle.icon}
        onClick={submitCallback}
        disabled={!canSubmit}
      >
        <FloppyDisk1Ic />
      </Button>
    
    </BottomButtonBar>
    
  
  </>
}
export default ReactMemoTyped(ProfilePage)





