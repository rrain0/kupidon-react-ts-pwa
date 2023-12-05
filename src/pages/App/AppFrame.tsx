/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import AutoLangSettings from 'src/components/AutoLangSettings/AutoLangSettings'
import AppRouting from 'src/pages/App/AppRouting'



const AppFrame =
React.memo(
()=>{
  
  return <Frame id='app-frame'>
    
    <AppRouting/>
    
    <AutoLangSettings />
    
  </Frame>
})
export default AppFrame


const Frame = styled.div`
  display: contents;
`