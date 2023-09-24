import { css } from '@emotion/react'
import { Themes } from 'src/theme/Themes'


export namespace SimpleSvgIconsStyle {
  
  export const defolt = (t: Themes.Theme) => css`
    &.rrainuiIcon {
      --icon-size: auto;
      //width: auto; height: auto;
      --icon-color: 'black';
    }
  `
  
  
}