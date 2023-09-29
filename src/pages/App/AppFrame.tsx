/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import AppRouting from 'src/pages/App/AppRouting'
import { SimpleGradientBgc } from 'src/styles/bgc/SimpleGradientBgc'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import full = EmotionCommon.fill



const AppFrame = ()=>{
  
  return <Frame id='app-frame'>
    
    <AppRouting/>
    
  </Frame>
}
export default ReactMemoTyped(AppFrame)


const Frame = styled.div`
  display: contents;
  
  /*width: 100dvw;
  height: 100dvh;
  
  display: grid;
  place-items: stretch;

  ${p=>SimpleGradientBgc(p.theme)};*/
`