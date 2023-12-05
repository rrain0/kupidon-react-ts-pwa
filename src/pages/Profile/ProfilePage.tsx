/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import { PageScrollbarOverlayFrame } from 'src/components/Page/PageScrollbarOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import ProfileContent from 'src/pages/Profile/ProfileContent'
import { useSetRecoilState } from 'recoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
import { SvgIcons } from 'src/views/icons/SvgIcons'





const ProfilePage =
React.memo(
()=>{
  
  const setAuth = useSetRecoilState(AuthRecoil)
  
  
  const fetchUser = async() => {
    const resp = await UserApi.current()
    if (resp.success)
      setAuth(curr=>({ ...curr!, user: resp.data.user }))
    else console.warn('unsuccessful fetch user:', resp)
  }
  
  
  useEffect(
    ()=>void fetchUser(),
    []
  )
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  
  
  
  return <>
    <Page ref={pageRef}>
      
      <ProfileContent/>
      
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
    
    
    {/* <BottomButtonBar
      rightChildren={
        canSubmit && <Button css={[ButtonStyle.icon, css`margin-right: 8px;`]}
          onClick={submitCallback}
        >
          <FloppyDisk1Ic />
        </Button>
      }
    /> */}
    
  
  </>
})
export default ProfilePage




