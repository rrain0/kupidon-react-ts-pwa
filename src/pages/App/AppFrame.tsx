/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import AutoLangSettings from 'src/components/AutoLangSettings/AutoLangSettings'
import AppRouting from 'src/pages/App/AppRouting'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped



const AppFrame = ()=>{
  
  return <Frame id='app-frame'>
    
    <AppRouting/>
    
    <AutoLangSettings />
    
  </Frame>
}
export default ReactMemoTyped(AppFrame)


const Frame = styled.div`
  display: contents;
`