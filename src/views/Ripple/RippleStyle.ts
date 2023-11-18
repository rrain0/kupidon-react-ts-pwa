import { css } from '@emotion/react'
import { Themes } from 'src/utils/theme/Themes'
import Theme = Themes.Theme




export namespace RippleStyle {
  
  export namespace El {
    export const frameClassName = 'rrainuiRippleFrame'
    export const viewClassName = 'rrainuiRippleView'
    
    export const frameClass = '.'+frameClassName
    export const viewClass = '.'+viewClassName
    
    export const frame = '&'+frameClass
    export const view = frame+'>'+viewClass
  }
  export namespace Prop {
    export const mode = '--ripple-mode'
    export const color = '--ripple-color'
  }
  
  
  
  
  export const normal = (t:Theme)=>css`
    ${El.frame} {
    
    }
    ${El.view} {

    }
  `
  
  
  
}