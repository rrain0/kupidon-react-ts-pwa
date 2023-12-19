/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef } from 'react'
import PageScrollbars from 'src/components/Page/PageScrollbars/PageScrollbars'
import ProfileContent from 'src/pages/Profile/ProfileContent'
import { useSetRecoilState } from 'recoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page





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
    
    
    <PageScrollbars pageRef={pageRef} />
    
    
    
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




