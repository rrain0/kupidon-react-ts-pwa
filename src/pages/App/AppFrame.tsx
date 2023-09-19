/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import BottomNavBarRouting from 'src/components/BottomNavBar/BottomNavBarRouting'
import AppRouting from 'src/pages/App/AppRouting'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col


const AppFrame = ()=>{
  
  return <Frame>
    
    <PageFrame>
      <AppRouting/>
    </PageFrame>
    
    {/*<AppRouting/>*/}
    
    {/*<div
      css={css`
        background: #61dafb;
      `}
    ></div>*/}
    
    
    
    <BottomNavBarRouting/>
    
  </Frame>
}
export default AppFrame


const Frame = styled.div`
  position: fixed;
  inset: 0;
  
  display: grid;
  grid-template-rows: 1fr auto;
  justify-items: stretch;
  
  /*
  ${col};
  >:first-child {
    flex: 1;
  }
  >:last-child {
  }
  align-items: stretch;
  justify-content: end;
  */
`
const PageFrame = styled.div`
  overflow: auto;
`