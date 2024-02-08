/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useRef, useState } from 'react'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { ButtonBarComponents } from 'src/components/BottomButtonBar/components'
import Form from 'src/components/FormElements/Form'
import OverflowWrapper from 'src/components/Scrollbars/OverflowWrapper'
import { OverflowWrapperStyle } from 'src/components/Scrollbars/OverflowWrapperStyle'
import ProfileContent from 'src/pages/Profile/ProfileContent'
import { useSetRecoilState } from 'recoil'
import ProfileTabHeader, { ProfileTabHeaderContext } from 'src/pages/Profile/ProfileTabHeader'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { Pages } from 'src/components/Page/Pages'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { useAsyncEffect } from 'src/utils/react/useAsyncEffect'
import Tab from 'src/views/Tabs/Tab'
import Tabs from 'src/views/Tabs/Tabs'
import { TabIdx, TabsState } from 'src/views/Tabs/useTabs'
import SoftRefreshBtn = ButtonBarComponents.SoftRefreshBtn
import TabsPage = Pages.TabsPage
import pageColors = Pages.pageColors
import pageContentPaddings = Pages.pageContentPaddings
import col = EmotionCommon.col
import safePageContentPaddings = Pages.safePageContentPaddings
import fill = EmotionCommon.fill











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
  
  
  
  const [profileHeader, setProfileHeader] = useState('')
  
  
  
  return <>
    <TabsPage>
      
      <Tabs css={fill} {...tabsProps}>{({ tabContainerSpring, computedTabsDimens })=><>
        {ArrayUtils.ofIndices(4).map(tabIdx=>
          <Tab css={fill} key={tabIdx}
            width={computedTabsDimens.frameWidth}
          >
            
            
            <OverflowWrapper css={css`
              ${OverflowWrapperStyle.defolt};
              ${OverflowWrapperStyle.El.container.thiz()}{
                touch-action: pan-y;
              }
              ${OverflowWrapperStyle.El.scrollbarOverlay.thiz()}{
                ${safePageContentPaddings};
              }
            `}
              showVertical={!(['dragging','snapping'] as TabsState[]).includes(tabsProps.tabsState)}
            >
            <div css={t=>css`
              ${pageContentPaddings};
              ${col};
              align-items: center;
              ${pageColors(t)};
              width: 100%;
              height: fit-content;
              touch-action: pan-y;
            `}>
              
              <ProfileTabHeaderContext.Provider value={{
                tabContainerSpring,
                tabWidth: computedTabsDimens.frameWidth,
                headers: ['Предпросмотр',profileHeader,'Партнёр','Свидание'],
                setTabsState,
                setTabIdx,
              }}>
              {function(){
                switch (tabIdx) {
                  case 0: return <Form><ProfileTabHeader thisTabIdx={0}/></Form>
                  case 1: return <ProfileContent setProfileHeader={setProfileHeader}/>
                  case 2: return <Form><ProfileTabHeader thisTabIdx={2}/></Form>
                  case 3: return <Form><ProfileTabHeader thisTabIdx={3}/></Form>
                }
              }()}
            </ProfileTabHeaderContext.Provider>
          
            </div>
          </OverflowWrapper>
          
          
          </Tab>
        )}
      </>}</Tabs>
      
    </TabsPage>
    
    
    
    
    
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




