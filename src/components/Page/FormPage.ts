import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import { SimpleGradientBgc } from 'src/styles/bgc/SimpleGradientBgc'




export namespace FormPage {
  
  
  export const Page = styled.main`
    width: 100%;
    height: fit-content;
    min-height: 100%;
    position: relative;
  `
  
  export const PageContent = styled.div`
    min-width: 200px; width: 100%;
    min-height: 100%; height: fit-content;
    ${center};
    padding: 50px 12px;
    ${p=>SimpleGradientBgc(p.theme)};
  `
  
  
}