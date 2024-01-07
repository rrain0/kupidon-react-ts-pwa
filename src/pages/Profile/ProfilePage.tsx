/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { ButtonBarComponents } from 'src/components/BottomButtonBar/components'
import PageScrollbars from 'src/components/Scrollbars/PageScrollbars'
import ProfileContent from 'src/pages/Profile/ProfileContent'
import { useSetRecoilState } from 'recoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
import SoftRefreshBtn = ButtonBarComponents.SoftRefreshBtn





const ProfilePage =
React.memo(
()=>{
  
  const setAuth = useSetRecoilState(AuthRecoil)
  
  
  const [needToFetchUser, setNeedToFetchUser] = useState(true)
  const [isFetchingUser, setFetchingUser] = useState(false)
  const fetchUser = async() => {
    const resp = await UserApi.current()
    if (resp.success)
      setAuth(curr=>({ ...curr!, user: resp.data.user }))
    else
      console.warn('failed to fetch user:', resp)
  }
  
  
  useEffect(
    ()=>{
      if (needToFetchUser && !isFetchingUser){
        setNeedToFetchUser(false)
        setFetchingUser(true)
        fetchUser().finally(()=>setFetchingUser(false))
      }
    },
    [needToFetchUser, isFetchingUser]
  )
  
  
  
  return <>
    <Page>
      
      <ProfileContent/>
      
      <PageScrollbars />
      
    </Page>
    
    
    
    
    
    { process.env.NODE_ENV==='development' && <BottomButtonBar
      refreshPageBtn
      rightChildren={
        <SoftRefreshBtn
          refresh={()=>setNeedToFetchUser(true)}
          isLoading={isFetchingUser}
        />
      }
    /> }
    
  
  </>
})
export default ProfilePage




