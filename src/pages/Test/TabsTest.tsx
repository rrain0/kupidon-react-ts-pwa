/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Pages } from 'src/components/Page/Pages'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import Tab from 'src/views/Tabs/Tab'
import Tabs from 'src/views/Tabs/Tabs'
import { TabIdx, TabsState } from 'src/views/Tabs/useTabs'
import SimplePage = Pages.SimplePage
import SimpleContent = Pages.SimpleContent






const TabsTest = ()=>{
  
  const [tabsState, setTabsState] = useState<TabsState>('opened')
  const [tabIdx, setTabIdx] = useState<TabIdx>(0)
  
  const tabFrameRef = useRef<HTMLDivElement>(null)
  
  const tabsProps = {
    tabsState, setTabsState,
    tabIdx, setTabIdx,
    tabFrameRef,
  }
  
  return <SimplePage>
    <SimpleContent>
      
      <div>Tabs Test</div>
      
      <div css={css`
        color: black;
      `}>
        
        
        <Tabs css={css`
          max-width: 400px;
          background: darkseagreen;
        `}
          {...tabsProps}
        >{()=><>
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
        </>}</Tabs>
        
        
      </div>
      
    
    </SimpleContent>
  </SimplePage>
}
export default TabsTest




