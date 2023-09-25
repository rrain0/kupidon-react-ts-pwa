import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import abs = EmotionCommon.abs
import full = EmotionCommon.full


export namespace SimplePage {
  
  
  export const PageFrame = styled.div`
    ${full};
    position: relative;
    background: ${p=>p.theme.page.bgc2[1]};
    color: ${p=>p.theme.page.text[0]};
  `
  
  export const Page = styled.main`
    width: 100%;
    height: 100%;
    position: relative;
    background: ${p=>p.theme.page.bgc2[1]};
    color: ${p=>p.theme.page.text[0]};
  `
  export const PageContentFrame = styled.main`
    ${full};
    position: relative;
    overflow: auto;
    background: ${p=>p.theme.page.bgc2[1]};
    color: ${p=>p.theme.page.text[0]};
  `
  export const PageContent = styled.main`
    min-width: 200px; width: 100%;
    min-height: 100%; height: fit-content;
    padding: 70px 12px;
    ${col};
    gap: 20px;
    place-content: start;
    background: ${p=>p.theme.page.bgc2[1]};
    color: ${p=>p.theme.page.text[0]};
  `
  
}