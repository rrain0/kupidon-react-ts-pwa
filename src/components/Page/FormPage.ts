import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { SimpleGradientBgc } from 'src/styles/bgc/SimpleGradientBgc'





export namespace FormPage {
  import center = EmotionCommon.center
  
  
  export const Page = styled.main`
    position: fixed;
    inset: 0;
  `
  export const PageContent = styled.div`
    min-width: 200px; width: 100%;
    min-height: 100%; height: fit-content;
    ${center};
    padding: 32px;
    ${p=>SimpleGradientBgc(p.theme)};
  `
  
  
}