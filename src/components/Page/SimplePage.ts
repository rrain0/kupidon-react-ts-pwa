import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'


export namespace SimplePage {
  import col = EmotionCommon.col
  
  
  export const Page = styled.main`
    position: fixed;
    inset: 0;
    overflow: auto;
    background: ${p=>p.theme.page.bgc2[1]};
    color: ${p=>p.theme.page.text[0]};
  `
  export const PageContent = styled.main`
    min-width: 200px; width: 100%;
    min-height: 100%; height: fit-content;
    padding: 20px;
    ${col};
    gap: 20px;
    place-content: start;
    background: ${p=>p.theme.page.bgc2[1]};
    color: ${p=>p.theme.page.text[0]};
  `
  
}