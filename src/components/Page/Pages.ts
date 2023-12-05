import { css } from '@emotion/react'
import React from 'react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import { SimpleGradientBgc } from 'src/styles/bgc/SimpleGradientBgc'
import fill = EmotionCommon.fill
import col = EmotionCommon.col




export namespace Pages {
  
  
  
  export const modalFrameStyle = css`
    min-width: 220px;
    width: 100dvw;
    min-height: max(220px,100dvh);
    max-height: fit-content;
  `
  
  
  
  export const pageFrameStyle = css`
    ${modalFrameStyle};
    position: relative;
    
    //padding-top: var(--top-page-inset);
    padding-top: 70px;
    padding-bottom: var(--bottom-page-inset);
    padding-left: 20px;
    padding-right: 20px;
    
    ${center};
  `
  
  
  
  
  
  export const SimplePage =
  React.memo(
  styled.main`
    ${pageFrameStyle};
    background: ${p=>p.theme.page.bgc[0]};
    color: ${p=>p.theme.page.content[0]};
  `)
  
  
  
  
  export const Page =
  React.memo(
  styled.main`
    ${pageFrameStyle};
    ${p=>SimpleGradientBgc(p.theme)};
    color: ${p=>p.theme.page.content[0]};
  `)
  
  
  
  
  
  export const SimpleContent =
  React.memo(
  styled.div`
    ${fill};
    ${col};
    gap: 10px;
  `)
  
  
}