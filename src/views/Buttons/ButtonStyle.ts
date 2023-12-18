import { css } from '@emotion/react'
import { Themes } from 'src/utils/theme/Themes'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CommonStyle } from 'src/views/CommonStyle'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
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
    export const iconClassName = SvgIcStyle.El.iconClassName
    
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
    export const color = CommonStyle.Prop.color
    export const rippleMode = RippleStyle.Prop.mode
    export const rippleColor = RippleStyle.Prop.color
    export const iconSize = SvgIcStyle.Prop.size
    export const iconColor = SvgIcStyle.Prop.color
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
        padding: 8px 6px;
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
    
    export const roundedSmall = css`
      ${El.btn} {
        width: fit-content;
        min-height: 30px;
        border-radius: 1000000px;
        padding: 4px 16px;
        ${Txt.small1};
      }
    `
    
  }
  
  
  
  namespace Color {
    
    export const main = (t:Theme) => css`
      // normal
      ${El.btn} {
        background: ${t.buttonMain.bgc[0]};
        color: ${t.buttonMain.content[0]};
        ${Prop.color}: ${t.buttonMain.content[0]};
      }
      ${El.ripple} {
        ${Prop.rippleColor}: ${t.ripple.content[0]};
      }
      
      // hover
      ${hoverable}{ ${El.btnHover} {
        background: ${t.buttonMain.bgcFocus[0]};
      }}
      
      // active
      ${El.btnActive} {}
      
      // focus
      ${El.btnFocus} {}
      
      // focus-visible
      ${El.btnFocusVisible} {
        background: ${t.buttonMain.bgcFocus[0]};
      }
      
      // disabled
      ${El.btnDisabled} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.color}: ${t.elementDisabled.content[0]};
      }
      
      // error
      ${El.borderError} {}
    `
    
    
    
    export const accent = (t:Theme) => css`
      // normal
      ${El.btn} {
        background: ${t.buttonAccent.bgc[0]};
        color: ${t.buttonAccent.content[0]};
        ${Prop.color}: ${t.buttonAccent.content[0]};
      }
      ${El.ripple} {
        ${Prop.rippleColor}: ${t.ripple.content[0]};
      }

      // hover
      ${hoverable}{ ${El.btnHover} {
        background: ${t.buttonAccent.bgcFocus[0]};
      }}

      // focus-visible
      ${El.btnFocusVisible} {
        background: ${t.buttonAccent.bgcFocus[0]};
      }

      // disabled
      ${El.btnDisabled} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.color}: ${t.elementDisabled.content[0]};
      }
    `
    
    
    export const secondary = (t:Theme)=>css`
      // normal
      ${El.btn} {
        background: ${t.buttonSecondary.bgc[0]};
        color: ${t.buttonSecondary.content[0]};
        ${Prop.color}: ${t.buttonSecondary.content[0]};
      }
      ${El.border} {
        border: 1px solid;
        border-color: ${t.buttonSecondary.content[0]};
      }
      ${El.ripple} {
        ${Prop.rippleColor}: ${t.ripple.contentOnTransparent[0]};
      }

      // hover
      ${hoverable}{ ${El.btnHover} {
        background: ${t.buttonSecondary.bgcFocus[0]};
      }}

      // focus-visible
      ${El.btnFocusVisible} {
        background: ${t.buttonSecondary.bgcFocus[0]};
      }

      // disabled
      ${El.btnDisabled} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.color}: ${t.elementDisabled.content[0]};
      }
    `
    
    
    
    export const transparent = (t:Theme)=>css`
      // normal
      ${El.btn} {
        background: transparent;
        color: ${t.page.content[0]};
        ${Prop.color}: ${t.page.content[0]};
      }
      ${El.border} {
        border: 1px solid;
        border-color: transparent;
      }
      ${El.ripple} {
        ${Prop.rippleColor}: ${t.ripple.contentOnTransparent[0]};
      }

      // hover
      ${hoverable}{ ${El.btnHover} {
        background: ${t.buttonTransparent.bgcFocus[0]};
      }}

      // focus-visible
      ${El.btnFocusVisible} {
        background: ${t.buttonTransparent.bgcFocus[0]};
      }

      // disabled
      ${El.btnDisabled} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.color}: ${t.elementDisabled.content[0]};
      }
    `
    
    
    export const danger = (t:Theme) => css`
      // normal
      ${El.btn} {
        background: ${t.elementDanger.bgc[0]};
        color: ${t.elementDanger.content[0]};
        ${Prop.color}: ${t.elementDanger.content[0]};
      }
      ${El.ripple} {
        ${Prop.rippleColor}: ${t.ripple.content[0]};
      }
      
      // hover
      ${hoverable}{ ${El.btnHover} {
        background: ${t.elementDanger.bgcFocus[0]};
      }}
      
      // focus-visible
      ${El.btnFocusVisible} {
        background: ${t.elementDanger.bgcFocus[0]};
      }
      
      // disabled
      ${El.btnDisabled} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.color}: ${t.elementDisabled.content[0]};
      }
    `
  }
  
  
  
  export const bigRectMain = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${Color.main(t)};
  `
  export const bigRectAccent = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${Color.accent(t)};
  `
  export const bigRectTransparent = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${Color.transparent(t)};
  `
  export const bigRectDanger = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${Color.danger(t)};
  `
  
  
  export const smallRectAccent = (t:Theme) => css`
    ${common};
    ${Shape.smallRect};
    ${Color.accent(t)};
  `
  
  
  export const roundedAccent = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${Color.accent(t)};
    ${El.btn} {
      color: ${t.buttonAccent.content2[0]};
      ${Prop.color}: ${t.buttonAccent.content2[0]};
    }
  `
  export const roundedSmallAccent = (t:Theme) => css`
    ${common};
    ${Shape.roundedSmall};
    ${Color.accent(t)};
    ${El.btn} {
      color: ${t.buttonAccent.content2[0]};
      ${Prop.color}: ${t.buttonAccent.content2[0]};
    }
  `
  export const roundedSmallSecondary = (t:Theme) => css`
    ${common};
    ${Shape.roundedSmall};
    ${Color.secondary(t)};
  `
  
  export const roundedDanger = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${Color.danger(t)};
  `
  
  
  
  
  
  
  
  
  
  
  
  
  export const icon = (t:Theme) => css`
    ${common};
    // normal
    ${El.btn} {
      height: 50px;
      width: 50px;
      //border-radius: 26%;
      border-radius: 999999px;
      padding: 14px;
      
      background: ${t.buttonMain.bgc[0]};
      color: ${t.buttonMain.content[0]};
      ${Prop.color}: ${t.buttonMain.content[0]};
    }
    ${El.ripple} {
      ${Prop.rippleMode}: center;
      ${Prop.rippleColor}: ${t.ripple.content[0]};
    }
    ${El.icon} {
      ${Prop.iconSize}: 100%;
      ${Prop.iconColor}: ${t.buttonMain.content[0]};
    }
    
    // hover
    ${hoverable}{ ${El.btnHover} {
      background: ${t.buttonMain.bgcFocus[0]};
    }}

    // focus-visible
    ${El.btnFocusVisible} {
      background: ${t.buttonMain.bgcFocus[0]};
    }
    
    // disabled
    ${El.btnDisabled} {
      background: ${t.elementDisabled.bgc[0]};
      color: ${t.elementDisabled.content[0]};
      ${Prop.color}: ${t.elementDisabled.content[0]};
    }
    ${El.iconDisabled} {
      ${Prop.iconColor}: ${t.elementDisabled.content[0]};
    }
  `
  
  
  
  export const iconTransparent = (t:Theme) => css`
    ${icon(t)};
    // normal
    ${El.btn} {
      border-radius: 999999px;
      background: none;
      color: ${t.buttonAccent.bgc[0]};
      ${Prop.color}: ${t.buttonAccent.bgc[0]};
    }
    ${El.ripple} {
      ${Prop.rippleColor}: ${t.ripple.contentOnTransparent[0]};
    }
    ${El.icon} {
      ${Prop.iconColor}: ${t.buttonAccent.bgc[0]};
    }

    // hover
    ${hoverable}{ ${El.btnHover} {
      background: ${t.buttonTransparent.bgcFocus[0]};
    }}

    // focus-visible
    ${El.btnFocusVisible} {
      background: ${t.buttonTransparent.bgcFocus[0]};
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
      gap: 3px;
      padding: 5px 0 2px;

      background: none;
      color: ${t.buttonNav.content[0]};
      ${Prop.color}: ${t.buttonNav.content[0]};
      
      ${Txt.small5};
      
      a.active & ${El.iconClass} {
        ${Prop.iconColor}: ${t.buttonNav.contentAccent[0]};
      }
    }
    ${El.ripple} {
      ${Prop.rippleMode}: center;
      ${Prop.rippleColor}: ${t.ripple.contentOnTransparent[0]};
    }
    ${El.icon} {
      ${Prop.iconSize}: 100%;
      ${Prop.iconColor}: ${t.buttonNav.content[0]};
    }
    
    // hover
    ${hoverable}{ ${El.btnHover} {
      background: ${t.buttonNav.bgcFocus[0]};
    }}

    // focus-visible
    ${El.btnFocusVisible} {
      background: ${t.buttonNav.bgcFocus[0]};
    }
  `
  
  
  
  
}