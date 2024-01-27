/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { ButtonBarComponents } from 'src/components/BottomButtonBar/components'
import PageScrollbars from 'src/components/Scrollbars/PageScrollbars'
import ProfileContent from 'src/pages/Profile/ProfileContent'
import { useSetRecoilState } from 'recoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { Pages } from 'src/components/Page/Pages'
import { useAsyncEffect } from 'src/utils/react/useAsyncEffect'
import Tab from 'src/views/Tabs/Tab'
import Tabs from 'src/views/Tabs/Tabs'
import { TabIdx, TabsState } from 'src/views/Tabs/useTabs'
import Page = Pages.Page
import SoftRefreshBtn = ButtonBarComponents.SoftRefreshBtn
import modalFrameStyle = Pages.modalFrameStyle





const ProfilePage =
React.memo(
()=>{
  
  const setAuth = useSetRecoilState(AuthRecoil)
  
  
  const [needToFetchUser, setNeedToFetchUser] = useState(true)
  const [isFetchingUser, setFetchingUser] = useState(false)
  useAsyncEffect(
    (lock,unlock)=>{
      if (needToFetchUser && !isFetchingUser
        && lock(UserApi.current)
      ){
        setNeedToFetchUser(false)
        setFetchingUser(true)
        ;(async()=>{
          try {
            const resp = await UserApi.current()
            if (resp.isSuccess)
              setAuth(curr=>({ ...curr!, user: resp.data.user }))
            else
              console.warn('failed to fetch user:', resp)
          }
          finally {
            setFetchingUser(false)
            unlock(UserApi.current)
          }
        })()
      }
    },
    [needToFetchUser, isFetchingUser]
  )
  
  
  const [tabsState, setTabsState] = useState<TabsState>('opened')
  const [tabIdx, setTabIdx] = useState<TabIdx>(1)
  const tabFrameRef = useRef<HTMLDivElement>(null)
  const tabsProps = {
    tabsState, setTabsState,
    tabIdx, setTabIdx,
    tabFrameRef,
  }
  
  
  return <>
    <Page css={css`
      padding-left: 0;
      padding-right: 0;
    `}>
      
      <Tabs {...tabsProps}>{()=><>
        
        <Tab css={css`
          ${modalFrameStyle};
          padding-left: 20px;
          padding-right: 20px;
        `}>
          Tab 1
        </Tab>
        
        <Tab css={css`
          ${modalFrameStyle};
          padding-left: 20px;
          padding-right: 20px;
        `}>
          <ProfileContent/>
        </Tab>
        
        <Tab css={css`
          ${modalFrameStyle};
          padding-left: 20px;
          padding-right: 20px;
        `}>
          Tab 3
        </Tab>
        
        <Tab css={css`
          ${modalFrameStyle};
          padding-left: 20px;
          padding-right: 20px;
        `}>
          Tab 4
        </Tab>
        
      </>}</Tabs>
      
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




