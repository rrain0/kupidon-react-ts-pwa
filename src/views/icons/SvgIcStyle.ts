import { css } from '@emotion/react'
import { Themes } from 'src/utils/theme/Themes'
import Theme = Themes.Theme



export namespace SvgIcStyle {
  
  export namespace El {
    export const iconClass = 'rrainuiIcon'
    
    export const iconDotClass = '.'+iconClass
    
    export const icon = iconDotClass
    
    export const iconThis = '&'+iconDotClass
  }
  export namespace Prop {
    export const size = '--icon-size'
    export const sizeVar = `var(${size})`
    
    export const color = '--icon-color'
    export const colorVar = `var(${color})`
    
    export const accentColor = '--icon-accent-color'
    export const accentColorVar = `var(${accentColor})`
  }
  
  
  
  
  export const normal = (t:Theme)=>css`
    ${El.iconThis} {
      ${Prop.size}: auto;
      ${Prop.color}: 'black';
    }
  `
  
  
}