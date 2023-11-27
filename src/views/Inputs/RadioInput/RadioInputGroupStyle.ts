import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { Themes } from 'src/utils/theme/Themes'
import rowWrap = EmotionCommon.rowWrap
import col = EmotionCommon.col



export namespace RadioInputGroupStyle {
  
  export namespace Attr {
    export const errorName = 'data-error'
    
    export const error = `[${errorName}]`
  }
  export namespace El {
    export const radioGroupClassName = 'rrainuiRadioGroup'
    export const borderClassName = 'rrainuiBorder'
    
    export const radioGroupClass = '.'+radioGroupClassName
    export const borderClass = '.'+borderClassName
    
    export const radioGroup = '&'+radioGroupClass
    export const radioGroupError = radioGroup+Attr.error
    
    export const border = radioGroup+'>'+borderClass
    export const borderError = radioGroupError+'>'+borderClass
  }
  export namespace Prop {
    export const color = '--color'
  }
  
  
  export const rowGroup = (t: Themes.Theme) => css`
    // normal
    ${El.radioGroup} {
      min-height: 50px;
      width: 100%;
      ${rowWrap};
      gap: 4px 32px;
      justify-content: start;
      align-items: center;
      border-radius: 15px;
    }
    
    // error
    ${El.radioGroupError} {
      background: ${t.input.error.bgc[0]};
    }
    ${El.borderError} {
      border: 2px solid ${t.input.error.border[0]};
    }
  `
  
  
  
  export const colGroup = (t: Themes.Theme) => css`
    // normal
    ${El.radioGroup} {
      width: 100%;
      ${col};
      //gap: 4px 32px;
      //justify-content: start;
      align-items: stretch;
      border-radius: 15px;
    }

    // error
    ${El.radioGroupError} {
      background: ${t.input.error.bgc[0]};
    }
    ${El.borderError} {
      border: 2px solid ${t.input.error.border[0]};
    }
  `
  
  
  
}