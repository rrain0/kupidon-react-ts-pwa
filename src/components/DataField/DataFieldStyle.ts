import { css } from '@emotion/react'
import { Theme } from 'src/theme/Theme'



export namespace DataFieldStyle {
  
  export const interactive = (t: Theme.Theme) => css`
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
  
  
  
  export const statik = (t: Theme.Theme) => css`
    ${interactive(t)};
    &.rrainuiFrame {
      cursor: auto;
      color: ${t.input.text};
    }
    
    >.rrainuiBorder {
      border: 2px solid ${t.page.text[0]};
    }
  `
  
  
}