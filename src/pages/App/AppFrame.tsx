/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import BottomNavBarRouting from 'src/components/BottomNavBar/BottomNavBarRouting'
import AppRouting from 'src/pages/App/AppRouting'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/ReactUtils'
import col = EmotionCommon.col
import ReactMemoTyped = ReactUtils.ReactMemoTyped


const AppFrame = ()=>{
  
  return <Frame>
    
    <AppRouting/>
    
    <BottomNavBarRouting/>
    
  </Frame>
}
export default ReactMemoTyped(AppFrame)


const Frame = styled.div`
  position: fixed;
  inset: 0;
  
  display: grid;
  grid-template-rows: 1fr auto;
  justify-items: stretch;
`