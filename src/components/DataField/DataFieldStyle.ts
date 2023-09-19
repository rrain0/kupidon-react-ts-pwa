import { css } from '@emotion/react'
import { Themes } from 'src/theme/Themes'
import Theme = Themes.Theme



export namespace DataFieldStyle {
  
  export const interactive = (t: Theme) => css`
    &.rrainuiFrame {
      cursor: pointer;
      border-radius: 15px;
      background: ${t.input.bgc};
      &[data-error]{
        background: ${t.input.error.bgc};
      }
      width: 100%;
      min-height: 50px;
      padding: 4px 16px;
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
      letter-spacing: 0.05em;
      color: ${t.input.text};
    }
    
    >.rrainuiBorder {
      border: 2px solid transparent;
      background-image: linear-gradient(
        to right,
        ${t.input.border[0]},
        ${t.input.border[1]},
        ${t.input.border[2]}
      );
      background-origin: border-box;
      background-size: 200% 100%;
      background-position: 100% 0;
      transition: background-position 0.8s ease-out;
      -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0) border-box;
      mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0) border-box;

      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
    @media not (hover: none) { :hover>.rrainuiBorder {
        background-position: 0 0;
    } }
    :active>.rrainuiBorder {}
    :focus-visible>.rrainuiBorder {
      background-position: 0 0;
    }
    :focus>.rrainuiBorder {
      background-position: 0 0;
    }
    &[data-error]>.rrainuiBorder{}
  `
  
  const small = (t: Theme) => css`
    &.rrainuiFrame {
      width: 100%;
      min-height: 40px;
      padding: 4px 12px;
      font-weight: 500;
      font-size: 16px;
      line-height: 129%;
      letter-spacing: 0.05em;
      
      >.rrainuiBorder {
        border-width: 1px;
      }
    }
  `
  
  export const interactiveSmall = (t: Theme) => css`
    ${interactive(t)};
    ${small(t)};
  `
  
  
  export const statik = (t: Theme) => css`
    ${interactive(t)};
    &.rrainuiFrame {
      cursor: auto;
      color: ${t.input.text};
    }
    
    >.rrainuiBorder {
      border: 2px solid ${t.page.text[0]};
    }
  `
  
  export const statikSmall = (t: Theme) => css`
    ${statik(t)};
    ${small(t)};
  `
  
  
}