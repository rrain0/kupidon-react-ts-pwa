/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { animated } from '@react-spring/web'
import React, { useEffect, useRef, useState } from 'react'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { ButtonBarComponents } from 'src/components/BottomButtonBar/components'
import Form from 'src/components/FormElements/Form'
import { formHeaderStyle } from 'src/components/FormElements/FormHeader'
import PageScrollbars from 'src/components/Scrollbars/PageScrollbars'
import ProfileContent from 'src/pages/Profile/ProfileContent'
import { useSetRecoilState } from 'recoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { Pages } from 'src/components/Page/Pages'
import { MathUtils } from 'src/utils/common/MathUtils'
import { useAsyncEffect } from 'src/utils/react/useAsyncEffect'
import Tab from 'src/views/Tabs/Tab'
import Tabs from 'src/views/Tabs/Tabs'
import { TabIdx, TabsState } from 'src/views/Tabs/useTabs'
import Page = Pages.Page
import SoftRefreshBtn = ButtonBarComponents.SoftRefreshBtn
import modalFrameStyle = Pages.modalFrameStyle
import fitRange2 = MathUtils.fitRange2
import mapRange = MathUtils.mapRange





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
    <Page css={css`
      padding-left: 0;
      padding-right: 0;
    `}>
      
      <Tabs {...tabsProps}>{({ tabContainerSpring, computedTabsDimens })=><>
        
        <Tab css={css`
          ${modalFrameStyle};
          overflow: visible;
          padding-left: 20px;
          padding-right: 20px;
        `}>
          
          
          <Form>
            
            <animated.h3 css={t=>css`
              ${formHeaderStyle(t)};
              //position: relative;
              //z-index: 100;
              user-select: none;
              cursor: pointer;
            `}
              onClick={ev=>{
                setTabsState('snapping')
                setTabIdx(0)
              }}
              style={{
                x: tabContainerSpring.scrollLeft.to(v=>{
                  const w = computedTabsDimens.frameWidth
                  const i = 0 // indexOfThisTab
                  v = fitRange2(v, [(i-1)*w, (i+1)*w])
                  v = mapRange(v, [(i-1)*w, (i+1)*w], [i*w, (i+1)*w])
                  v = mapRange(v, [i*w, (i+1)*w], [-(w/2), w/2])
                  return v
                }),
                scale: tabContainerSpring.scrollLeft.to(v=>{
                  const w = computedTabsDimens.frameWidth
                  const i = 0 // indexOfThisTab
                  v = fitRange2(v, [(i-1)*w, (i+1)*w])
                  v = mapRange(v, [(i-1)*w, (i+1)*w], [i*w, (i+1)*w])
                  v = mapRange(v, [i*w, (i+1)*w], [-(w/2), w/2])
                  v = 1 - 0.35 * Math.abs(v / (w/2))
                  return v
                }),
                opacity: tabContainerSpring.scrollLeft.to(v=>{
                  const w = computedTabsDimens.frameWidth
                  const i = 0 // indexOfThisTab
                  v = fitRange2(v, [(i-1)*w, (i+1)*w])
                  v = mapRange(v, [(i-1)*w, (i+1)*w], [i*w, (i+1)*w])
                  v = mapRange(v, [i*w, (i+1)*w], [-(w/2), w/2])
                  v = 1 - 0.6 * Math.abs(v / (w/2))
                  return v
                })
              }}
            >
              Предпросмотр
            </animated.h3>
          </Form>
          
          
        </Tab>
        
        <Tab css={css`
          ${modalFrameStyle};
          overflow: visible;
          padding-left: 20px;
          padding-right: 20px;
        `}>
          <ProfileContent
            tabContainerSpring={tabContainerSpring}
            tabWidth={computedTabsDimens.frameWidth}
            setTabsState={setTabsState}
            setTabIdx={setTabIdx}
          />
        </Tab>
        
        <Tab css={css`
          ${modalFrameStyle};
          overflow: visible;
          padding-left: 20px;
          padding-right: 20px;
        `}>
          
          
          <Form>
            
            <animated.h3 css={t=>css`
              ${formHeaderStyle(t)};
              //position: relative;
              //z-index: 100;
              user-select: none;
              cursor: pointer;
            `}
              onClick={ev=>{
                setTabsState('snapping')
                setTabIdx(2)
              }}
              style={{
                x: tabContainerSpring.scrollLeft.to(v=>{
                  const w = computedTabsDimens.frameWidth
                  const i = 2 // indexOfThisTab
                  v = fitRange2(v, [(i-1)*w, (i+1)*w])
                  v = mapRange(v, [(i-1)*w, (i+1)*w], [i*w, (i+1)*w])
                  v = mapRange(v, [i*w, (i+1)*w], [-(w/2), w/2])
                  return v
                }),
                scale: tabContainerSpring.scrollLeft.to(v=>{
                  const w = computedTabsDimens.frameWidth
                  const i = 2 // indexOfThisTab
                  v = fitRange2(v, [(i-1)*w, (i+1)*w])
                  v = mapRange(v, [(i-1)*w, (i+1)*w], [i*w, (i+1)*w])
                  v = mapRange(v, [i*w, (i+1)*w], [-(w/2), w/2])
                  v = 1 - 0.35 * Math.abs(v / (w/2))
                  return v
                }),
                opacity: tabContainerSpring.scrollLeft.to(v=>{
                  const w = computedTabsDimens.frameWidth
                  const i = 2 // indexOfThisTab
                  v = fitRange2(v, [(i-1)*w, (i+1)*w])
                  v = mapRange(v, [(i-1)*w, (i+1)*w], [i*w, (i+1)*w])
                  v = mapRange(v, [i*w, (i+1)*w], [-(w/2), w/2])
                  v = 1 - 0.6 * Math.abs(v / (w/2))
                  return v
                })
              }}
            >
              Партнёр
            </animated.h3>
          </Form>
          
          
        </Tab>
        
        <Tab css={css`
          ${modalFrameStyle};
          overflow: visible;
          padding-left: 20px;
          padding-right: 20px;
        `}>
          Tab 4
        </Tab>
        
      </>}</Tabs>
      
      {/* todo */}
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




