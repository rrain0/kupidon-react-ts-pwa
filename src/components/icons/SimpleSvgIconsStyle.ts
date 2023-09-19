import { css } from '@emotion/react'
import { Themes } from 'src/theme/Themes'


export namespace SimpleSvgIconsStyle {
  
  export const defolt = (t: Themes.Theme) => css`
    svg& {
      --icon-size: auto;
      //width: auto; height: auto;
      --icon-color: 'black';
    }
  `
  
  
}