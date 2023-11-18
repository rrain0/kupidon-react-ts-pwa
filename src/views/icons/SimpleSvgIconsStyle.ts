import { css } from '@emotion/react'
import { Themes } from 'src/utils/theme/Themes'
import Theme = Themes.Theme



export namespace SimpleSvgIconsStyle {
  
  export namespace El {
    export const iconClassName = 'rrainuiIcon'
    
    export const iconClass = '.'+iconClassName
    
    export const icon = '&'+iconClass
  }
  export namespace Prop {
    export const size = '--icon-size'
    export const color = '--icon-color'
    export const accentColor = '--icon-accent-color'
  }
  
  
  
  
  export const normal = (t:Theme)=>css`
    ${El.icon} {
      ${Prop.size}: auto;
      ${Prop.color}: 'black';
    }
  `
  
  
}