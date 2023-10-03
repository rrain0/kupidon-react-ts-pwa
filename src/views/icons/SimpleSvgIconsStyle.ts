import { css } from '@emotion/react'
import { Themes } from 'src/utils/theme/Themes'


export namespace SimpleSvgIconsStyle {
  
  export const defolt = (t: Themes.Theme) => css`
    &.rrainuiIcon {
      --icon-size: auto;
      //width: auto; height: auto;
      --icon-color: 'black';
    }
  `
  
  
}