import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import { SimpleGradientBgc } from 'src/styles/bgc/SimpleGradientBgc'
import fill = EmotionCommon.fill
import col = EmotionCommon.col




export namespace Pages {
  export const pageVerticalPadding = 50
  
  
  export const Page = styled.main`
    min-width: 220px;
    width: 100dvw;
    min-height: max(220px,100dvh);
    max-height: fit-content;
    position: relative;
    
    ${center};
    padding: ${pageVerticalPadding}px 12px;
    padding-bottom: var(--bottom-page-inset);
    ${p=>SimpleGradientBgc(p.theme)};
    color: ${p=>p.theme.page.text[0]};
  `
  
  
  
  
  
  
  
  export const SimplePage = styled.main`
    min-width: 220px;
    width: 100dvw;
    min-height: max(220px,100dvh);
    max-height: fit-content;
    position: relative;
    
    ${center};
    padding: ${pageVerticalPadding}px 12px;
    padding-bottom: var(--bottom-page-inset);
    background: ${p=>p.theme.page.bgc2[1]};
    color: ${p=>p.theme.page.text[0]};
  `
  
  
  export const SimpleContent = styled.div`
    ${fill};
    ${col};
    gap: 10px;
  `
  
  
}