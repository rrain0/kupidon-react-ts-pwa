import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import { SimpleGradientBgc } from 'src/styles/bgc/SimpleGradientBgc'
import centerAll = EmotionCommon.centerAll
import stretchAll = EmotionCommon.stretchAll




export namespace FormPage {
  
  
  export const Page = styled.main`
    width: 100%;
    height: 100%;
    position: relative;
    //place-self: stretch;
    /*${stretchAll};*/
  `
  export const PageContent = styled.div`
    min-width: 200px; width: 100%;
    min-height: 100%; height: fit-content;
    ${center};
    padding: 12px;
    ${p=>SimpleGradientBgc(p.theme)};
  `
  
  
}