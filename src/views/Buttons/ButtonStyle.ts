import { css } from '@emotion/react'
import { Themes } from 'src/utils/theme/Themes'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { SimpleSvgIconsStyle } from 'src/views/icons/SimpleSvgIconsStyle'
import { RippleStyle } from 'src/views/Ripple/RippleStyle'
import Theme = Themes.Theme
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable



export namespace ButtonStyle {
  
  export namespace Attr {
    export const errorName = 'data-error'
    
    export const error = `[${errorName}]`
  }
  export namespace El {
    export const btnClassName = 'rrainuiButton'
    export const borderClassName = 'rrainuiBorder'
    export const rippleFrameClassName = RippleStyle.El.frameClassName
    export const iconClassName = SimpleSvgIconsStyle.El.iconClassName
    
    export const btnClass = '.'+btnClassName
    export const borderClass = '.'+borderClassName
    export const rippleFrameClass = '.'+rippleFrameClassName
    export const iconClass = '.'+iconClassName
    
    export const btn = '&'+btnClass
    export const btnHover = btn+':hover'
    export const btnActive = btn+':active'
    export const btnFocus = btn+':focus'
    export const btnFocusVisible = btn+':focus-visible'
    export const btnActiveFocusVisible = btnActive+','+btnFocusVisible
    export const btnDisabled = btn+':disabled'
    export const btnError = btn+Attr.error
    
    export const border = btn+'>'+borderClass
    export const borderDisabled = btnDisabled+'>'+borderClass
    export const borderError = btnError+'>'+borderClass
    
    export const ripple = btn+'>*>'+rippleFrameClass
    export const rippleDisabled = btnDisabled+'>*>'+rippleFrameClass
    
    export const icon = btn+'>'+iconClass
    export const iconDisabled = btnDisabled+'>'+iconClass
  }
  export namespace Prop {
    export const color = '--color'
    export const rippleMode = RippleStyle.Prop.mode
    export const rippleColor = RippleStyle.Prop.color
    export const iconSize = SimpleSvgIconsStyle.Prop.size
    export const iconColor = SimpleSvgIconsStyle.Prop.color
  }
  
  
  
  const common = css`
    // normal
    ${El.btn} {
      transition: background linear 300ms;
      overflow-wrap: anywhere;
    }
    
    // disabled
    ${El.rippleDisabled} {
      display: none;
    }
  `
  
  
  namespace Shape {
    
    export const bigRect = css`
      ${El.btn} {
        width: 100%;
        min-height: 50px;
        border-radius: 15px;
        padding: 8px 4px;
        ${Txt.large2};
      }
    `
    export const smallRect = css`
      ${El.btn} {
        width: auto;
        min-height: 30px;
        border-radius: 10px;
        padding: 4px 6px;
        gap: 4px;
        ${Txt.normal1};
      }
    `
    
    export const rounded = css`
      ${El.btn} {
        width: fit-content;
        min-height: 40px;
        border-radius: 1000000px;
        padding: 8px 20px;
        ${Txt.small1};
      }
    `
    
  }
  
  
  
  namespace Color {
    
    export const primary = (t:Theme) => css`
      // normal
      ${El.btn} {
        background: ${t.button.primary.bgc[0]};
        color: ${t.button.primary.text[0]};
        ${Prop.color}: ${t.button.primary.text[0]};
      }
      ${El.ripple} {
        ${Prop.rippleColor}: ${t.button.primary.ripple[0]};
      }
      
      // hover
      ${hoverable}{ ${El.btnHover} {
        background: ${t.button.primary.hover[0]};
      }}
      
      // active
      ${El.btnActive} {}
      
      // focus
      ${El.btnFocus} {}
      
      // focus-visible
      ${El.btnFocusVisible} {
        background: ${t.button.primary.active[0]};
      }
      
      // disabled
      ${El.btnDisabled} {
        background: ${t.button.primary.disabled.bgc[0]};
        color: ${t.button.primary.disabled.text[0]};
        ${Prop.color}: ${t.button.primary.disabled.text[0]};
      }
      
      // error
      ${El.borderError} {}
    `
    
    
    
    export const normal = (t:Theme) => css`
      // normal
      ${El.btn} {
        background: ${t.element.normal.bgc[0]};
        color: ${t.element.normal.text[0]};
        ${Prop.color}: ${t.element.normal.text[0]};
      }
      ${El.ripple} {
        ${Prop.rippleColor}: ${t.ambience.bgc[0]};
      }

      // hover
      ${hoverable}{ ${El.btnHover} {
        background: ${t.element.normal.bgc[1]};
      }}

      // focus-visible
      ${El.btnFocusVisible} {
        background: ${t.element.normal.bgc[1]};
      }

      // disabled
      ${El.btnDisabled} {
        background: ${t.element.disabled.bgc[0]};
        color: ${t.element.disabled.text[0]};
        ${Prop.color}: ${t.element.disabled.text[0]};
      }
    `
    
    
    export const danger = (t:Theme) => css`
      // normal
      ${El.btn} {
        background: ${t.element.danger.bgc[0]};
        color: ${t.element.danger.text[0]};
        ${Prop.color}: ${t.element.danger.text[0]};
      }
      ${El.ripple} {
        ${Prop.rippleColor}: ${t.ambience.bgc[0]};
      }
      
      // hover
      ${hoverable}{ ${El.btnHover} {
        background: ${t.element.danger.bgc[1]};
      }}
      
      // focus-visible
      ${El.btnFocusVisible} {
        background: ${t.element.danger.bgc[1]};
      }
      
      // disabled
      ${El.btnDisabled} {
        background: ${t.element.disabled.bgc[0]};
        color: ${t.element.disabled.text[0]};
        ${Prop.color}: ${t.element.disabled.text[0]};
      }
    `
  }
  
  
  
  export const bigRectPrimary = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${Color.primary(t)};
  `
  export const bigRectNormal = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${Color.normal(t)};
  `
  export const bigRectDanger = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${Color.danger(t)};
  `
  
  
  export const smallRectNormal = (t:Theme) => css`
    ${common};
    ${Shape.smallRect};
    ${Color.normal(t)};
  `
  
  
  export const roundedNormal = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${Color.normal(t)};
    ${El.btn} {
      color: ${t.element.normal.text2[0]};
      ${Prop.color}: ${t.element.normal.text2[0]};
    }
  `
  
  export const roundedDanger = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${Color.danger(t)};
  `
  
  export const roundedSecondary = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${Color.normal(t)};
    ${El.btn} {
      color: ${t.element.normal.text2[0]};
      ${Prop.color}: ${t.element.normal.text2[0]};
    }
  `
  
  
  
  
  
  
  
  
  
  
  
  
  export const icon = (t:Theme) => css`
    ${common};
    // normal
    ${El.btn} {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      padding: 14px;
      
      background: ${t.button.primary.bgc[0]};
      color: ${t.button.primary.text[0]};
      ${Prop.color}: ${t.button.primary.text[0]};
    }
    ${El.ripple} {
      ${Prop.rippleMode}: center;
      ${Prop.rippleColor}: ${t.button.primary.ripple[0]};
    }
    ${El.icon} {
      ${Prop.iconSize}: 100%;
      ${Prop.iconColor}: ${t.button.primary.text[0]};
    }
    
    // hover
    ${hoverable}{ ${El.btnHover} {
      background: ${t.button.primary.hover[0]};
    }}

    // focus-visible
    ${El.btnFocusVisible} {
      background: ${t.button.primary.active[0]};
    }
    
    // disabled
    ${El.btnDisabled} {
      background: ${t.button.primary.disabled.bgc[0]};
      color: ${t.button.primary.disabled.text[0]};
      ${Prop.color}: ${t.button.primary.disabled.text[0]};
    }
    ${El.iconDisabled} {
      ${Prop.iconColor}: ${t.button.primary.disabled.text[0]};
    }
  `
  
  
  
  export const iconTransparent = (t:Theme) => css`
    ${icon(t)};
    // normal
    ${El.btn} {
      background: none;
      color: ${t.button.secondary.bgc[0]};
      ${Prop.color}: ${t.button.secondary.bgc[0]};
    }
    ${El.ripple} {
      ${Prop.rippleColor}: ${t.input.ripple[0]};
    }
    ${El.icon} {
      ${Prop.iconColor}: ${t.button.secondary.bgc[0]};
    }

    // hover
    ${hoverable}{ ${El.btnHover} {
      background: ${t.input.iconHover[0]};
    }}

    // focus-visible
    ${El.btnFocusVisible} {
      background: ${t.input.iconActive[0]};
    }
  `
  
  
  export const iconBigTransparent = (t:Theme) => css`
    ${iconTransparent(t)};
    ${El.btn} {
      padding: 11px;
    }
  `
  
  
  
  
  
  
  
  
  
  export const nav = (t:Theme)=>css`
    ${common};
    // normal
    ${El.btn} {
      height: 100%;
      flex: 1;
      ${col};
      align-items: center;
      gap: 2px;
      padding: 6px 0 2px;

      color: ${t.nav.button.text[0]};
      ${Prop.color}: ${t.nav.button.text[0]};
      
      ${Txt.small5};
      
      /* a.active & {
        color: ${t.nav.button.selected.text[0]};
        ${Prop.color}: ${t.nav.button.selected.text[0]};
      } */
      a.active & ${El.iconClass} {
        ${Prop.iconColor}: ${t.nav.button.selected.text[0]};
      }
    }
    ${El.ripple} {
      ${Prop.rippleMode}: center;
      ${Prop.rippleColor}: ${t.nav.button.ripple[0]};
    }
    ${El.icon} {
      ${Prop.iconSize}: 100%;
      ${Prop.iconColor}: ${t.nav.button.text[0]};
    }
    
    // hover
    ${hoverable}{ ${El.btnHover} {
      background: ${t.nav.button.hover[0]};
    }}

    // focus-visible
    ${El.btnFocusVisible} {
      background: ${t.nav.button.active[0]};
    }
  `
  
  
  
  
}