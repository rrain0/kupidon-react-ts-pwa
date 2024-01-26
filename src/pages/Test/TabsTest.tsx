/** @jsxImportSource @emotion/react */
import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types'
import React, { useRef, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import UseFakePointerRef, {
  useFakePointerRef,
} from 'src/components/ActionProviders/UseFakePointerRef'
import { Pages } from 'src/components/Page/Pages'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { MathUtils } from 'src/utils/common/MathUtils'
import { useNoSelect } from 'src/utils/react/useNoSelect'
import { TabIdx, TabsState, useTabs } from 'src/views/Tabs/useTabs'
import SimplePage = Pages.SimplePage
import SimpleContent = Pages.SimpleContent
import row = EmotionCommon.row
import col = EmotionCommon.col
import fitRange2 = MathUtils.fitRange2




// todo make some drag threshold




const TabsTest = ()=>{
  
  const [tabsState, setTabsState] = useState<TabsState>('opened')
  const [tabIdx, setTabIdx] = useState<TabIdx>(0)
  
  const tabFrameRef = useRef<HTMLDivElement>(null)
  const {
    computedTabsDimens,
    snapPointsPx,
    realDefaultOpenIdx,
    tabContainerSpring,
    tabDrag,
  } = useTabs(tabFrameRef, {
    state: tabsState,
    setState: setTabsState,
    tabIdx,
    setTabIdx,
  })
  
  
  useFakePointerRef([tabFrameRef])
  
  
  
  return <SimplePage>
    <SimpleContent>
      
      <div>Tabs Test</div>
      
      <div css={css`
        color: black;
      `}>
      <UseFakePointerRef>{({ ref })=>
        <TabsFrame
          ref={tabFrameRef}
          {...tabDrag()}
        >
          <animated.div css={tabsContainerStyle}
            style={{ x: tabContainerSpring.scrollLeft.to(v=>-v) }}
          >
            
            
            <Tab css={css`
              background: #8B8B8B;
            `}>
              {ArrayUtils.ofIndices(100).map((it,i)=><div key={i}>Tab 1 ({i+1})</div>)}
            </Tab>
            
            <Tab css={css`
              background: bisque;
            `}>
              {ArrayUtils.ofIndices(100).map((it,i)=><div key={i}>Tab 2 ({i+1})</div>)}
            </Tab>
            
            <Tab css={css`
              background: #5ac8fa;
            `}>
              <div>Tab 3</div>
            </Tab>
            
            <Tab css={css`
              background: darksalmon;
            `}>
              <div>Tab 4</div>
            </Tab>
            
          </animated.div>
        </TabsFrame>
      }</UseFakePointerRef>
      </div>
      
    
    </SimpleContent>
  </SimplePage>
}
export default TabsTest




const TabsFrame = styled.article`
  container: tabs-frame / inline-size;
  width: 100%;
  max-width: 400px;
  min-height: 800px;
  height: fit-content;
  background: darkseagreen;
  
  ${row};
  align-items: stretch;
  overflow-x: hidden;
  touch-action: pan-y;
`
const tabsContainerStyle = css`
  min-width: fit-content;
  width: fit-content;
  ${row};
  align-items: stretch;
  overflow: hidden;
  
  //translate: -100cqw 0;
`
const Tab = styled.div`
  min-width: 100cqw;
  width: 100cqw;
  max-width: 100cqw;
  max-height: 800px;
  ${col};
  overflow-y: auto;
`

