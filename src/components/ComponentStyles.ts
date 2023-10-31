import { css } from '@emotion/react'
import { Themes } from 'src/utils/theme/Themes'



export namespace ComponentStyles {
  
  
  
  export const formHeader = (t:Themes.Theme) => css`
    font-weight: 500;
    font-size: 28px;
    line-height: 150%;
    letter-spacing: 0.05em;
    color: ${t.page.text[0]};
    align-self: center;
    text-align: center;
  `
  
  
}