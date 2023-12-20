/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect  } from 'react'
import PageScrollbars from 'src/components/Scrollbars/PageScrollbars'
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
    else console.warn('failed to fetch user:', resp)
  }
  
  
  useEffect(
    ()=>void fetchUser(),
    []
  )
  
  
  
  return <>
    <Page>
      
      <ProfileContent/>
      
      <PageScrollbars />
    </Page>
    
    
    
    
    
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




