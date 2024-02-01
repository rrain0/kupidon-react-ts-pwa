/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { ButtonBarComponents } from 'src/components/BottomButtonBar/components'
import Form from 'src/components/FormElements/Form'
import OverflowWrapper from 'src/components/Scrollbars/OverflowWrapper'
import { OverflowWrapperStyle } from 'src/components/Scrollbars/OverflowWrapperStyle'
import PageScrollbars from 'src/components/Scrollbars/PageScrollbars'
import ProfileContent from 'src/pages/Profile/ProfileContent'
import { useSetRecoilState } from 'recoil'
import ProfileTabHeader from 'src/pages/Profile/ProfileTabHeader'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { Pages } from 'src/components/Page/Pages'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { useAsyncEffect } from 'src/utils/react/useAsyncEffect'
import Tab from 'src/views/Tabs/Tab'
import Tabs from 'src/views/Tabs/Tabs'
import { TabIdx, TabsState } from 'src/views/Tabs/useTabs'
import Page = Pages.Page
import SoftRefreshBtn = ButtonBarComponents.SoftRefreshBtn
import modalFrameStyle = Pages.modalFrameStyle
import TabsPage = Pages.TabsPage
import pageColors = Pages.pageColors
import pageLayoutStyle = Pages.pageLayoutStyle
import pageContentPaddings = Pages.pageContentPaddings
import col = EmotionCommon.col
import noScrollbars = EmotionCommon.noScrollbars
import safePageContentPaddings = Pages.safePageContentPaddings





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
    {/* todo */}
    <TabsPage>
      
      <Tabs {...tabsProps}>{({ tabContainerSpring, computedTabsDimens })=><>
        {ArrayUtils.ofIndices(4).map(tabIdx=>
          <Tab css={t=>css`
            height: 100%;
          `}
            width={computedTabsDimens.frameWidth}
          >
            
            
            <OverflowWrapper css={css`
              ${OverflowWrapperStyle.list};
              &.rrainuiOverflowWrapper {
                
                > .rrainuiScrollContainer {
                  
                  touch-action: pan-y;
                  > .rrainuiScrollContentWrap {}
                }
                
                > .rrainuiScrollbarOverlay {
                  ${safePageContentPaddings};
                }
                
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
              
              
              {function(){
                const headerProps = {
                  thisTabIdx: tabIdx,
                  tabContainerSpring,
                  tabWidth: computedTabsDimens.frameWidth,
                  headers: ['Предпросмотр','Профиль','Партнёр','Свидание'],
                  onClick: ()=>{
                    setTabsState('snapping')
                    setTabIdx(tabIdx)
                  },
                }
                switch (tabIdx) {
                  case 0: return <Form><ProfileTabHeader {...headerProps}>
                    Предпросмотр
                  </ProfileTabHeader></Form>
                  case 1: return <ProfileContent
                    header={header => <ProfileTabHeader {...headerProps}>
                      {header}
                    </ProfileTabHeader>}
                  />
                  case 2: return <Form><ProfileTabHeader {...headerProps}>
                    Партнёр
                  </ProfileTabHeader></Form>
                  case 3: return <Form><ProfileTabHeader {...headerProps}>
                    Свидание
                  </ProfileTabHeader></Form>
                }
              }()}
          
          
            </div>
          </OverflowWrapper>
          
          
          </Tab>
        )}
      </>}</Tabs>
      
      {/* todo */}
      {/* <PageScrollbars /> */}
      
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




