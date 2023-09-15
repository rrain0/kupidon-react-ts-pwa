import { css } from '@emotion/react'
import { Theme } from 'src/theme/Theme'


export namespace SimpleSvgIconsStyle {
  
  export const defolt = (t: Theme.Theme) => css`
    svg& {
      --icon-size: auto;
      //width: auto; height: auto;
      --icon-color: 'black';
    }
  `
  
  
}