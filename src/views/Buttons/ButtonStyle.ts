import { css } from '@emotion/react'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CommonStyle } from 'src/views/CommonStyle'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import { RippleStyle } from 'src/views/Ripple/RippleStyle'
import Theme = AppTheme.Theme
import col = EmotionCommon.col
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable
import generatePropVar = CommonStyle.generatePropVar
import generatePropVarDefault = CommonStyle.generatePropVarDefault
import generateElDotClass = CommonStyle.generateElDotClass
import generateElThis = CommonStyle.generateElThis
import generateAttrSelector = CommonStyle.generateAttrSelector
import generateAttrThisSelector = CommonStyle.generateAttrThisSelector




export namespace ButtonStyle {
  
  export namespace Attr {
    export const attr = {
      error: CommonStyle.Attr0.attr.error,
    } as const
    export const select = generateAttrSelector(attr)
    export const selThis = generateAttrThisSelector(select)
  }
  export namespace El {
    export const clazz = {
      btn:    'rrainuiButton',
      border: 'rrainuiBorder',
      ripple: RippleStyle.El.frameClassName,
      icon:   SvgIcStyle.El.clazz.icon,
    } as const
    
    export const dotClazz = generateElDotClass(clazz)
    
    // TODO set path to elements separately and generate via path
    const elMain = {
      btn: dotClazz.btn,
    } as const
    const elBasic = {
      border: elMain.btn+'>'+dotClazz.border,
      ripple: elMain.btn+'>*>'+dotClazz.ripple,
      icon:   elMain.btn+'>'+dotClazz.icon,
    } as const
    const elMainStateSimple = {
      btnHover:        elMain.btn+':hover',
      btnActive:       elMain.btn+':active',
      btnFocus:        elMain.btn+':focus',
      btnFocusVisible: elMain.btn+':focus-visible',
      btnDisabled:     elMain.btn+':disabled',
      btnError:        elMain.btn+Attr.select.error,
    } as const
    const elMainStateComplex = {
      btnActiveFocusVisible: elMainStateSimple.btnActive+','+elMainStateSimple.btnFocusVisible,
    } as const
    const elBasicStateSimple = {
      borderDisabled:     elMainStateSimple.btnDisabled+'>'+dotClazz.border,
      borderError:        elMainStateSimple.btnError+'>'+dotClazz.border,
      
      rippleDisabled:     elMainStateSimple.btnDisabled+'>*>'+dotClazz.ripple,
      
      iconDisabled:       elMainStateSimple.btnDisabled+'>*>'+dotClazz.icon,
    } as const
    export const el = {
      ...elMain,
      ...elBasic,
      ...elMainStateSimple,
      ...elMainStateComplex,
      ...elBasicStateSimple,
    } as const
    
    export const thiz = generateElThis(el)
  }
  export namespace Prop {
    export const prop = {
      color:       CommonStyle.Prop.prop.color,
      rippleMode:  RippleStyle.Prop.mode,
      rippleColor: RippleStyle.Prop.color,
      iconSize:    SvgIcStyle.Prop.prop.size,
      iconColor:   SvgIcStyle.Prop.prop.color,
    } as const
    export const varr = generatePropVar(prop)
    export const vard = generatePropVarDefault(prop)
  }
  
  
  
  const common = css`
    // normal
    ${El.thiz.btn} {
      transition: background linear 300ms;
      overflow-wrap: anywhere;
    }
    
    // disabled
    ${El.thiz.rippleDisabled} {
      display: none;
    }
  `
  
  
  namespace Shape {
    
    export const bigRect = css`
      ${El.thiz.btn} {
        width: 100%;
        min-height: 50px;
        border-radius: 15px;
        padding: 8px 6px;
        ${Txt.large2};
      }
    `
    export const smallRect = css`
      ${El.thiz.btn} {
        width: auto;
        min-height: 30px;
        border-radius: 10px;
        padding: 4px 6px;
        gap: 4px;
        ${Txt.normal1};
      }
    `
    
    export const rounded = css`
      ${El.thiz.btn} {
        width: fit-content;
        min-height: 40px;
        border-radius: 1000000px;
        padding: 8px 20px;
        ${Txt.small1};
      }
    `
    
    export const roundedSmall = css`
      ${El.thiz.btn} {
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
      ${El.thiz.btn} {
        background: ${t.buttonMain.bgc[0]};
        color: ${t.buttonMain.content[0]};
        ${Prop.prop.color}: ${t.buttonMain.content[0]};
      }
      ${El.thiz.ripple} {
        ${Prop.prop.rippleColor}: ${t.ripple.content[0]};
      }
      
      // hover
      ${hoverable}{ ${El.thiz.btnHover} {
        background: ${t.buttonMain.bgcFocus[0]};
      }}
      
      // active
      ${El.thiz.btnActive} {}
      
      // focus
      ${El.thiz.btnFocus} {}
      
      // focus-visible
      ${El.thiz.btnFocusVisible} {
        background: ${t.buttonMain.bgcFocus[0]};
      }
      
      // disabled
      ${El.thiz.btnDisabled} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.prop.color}: ${t.elementDisabled.content[0]};
      }
      
      // error
      ${El.thiz.borderError} {}
    `
    
    
    
    export const accent = (t:Theme) => css`
      // normal
      ${El.thiz.btn} {
        background: ${t.buttonAccent.bgc[0]};
        color: ${t.buttonAccent.content[0]};
        ${Prop.prop.color}: ${t.buttonAccent.content[0]};
      }
      ${El.thiz.ripple} {
        ${Prop.prop.rippleColor}: ${t.ripple.content[0]};
      }

      // hover
      ${hoverable}{ ${El.thiz.btnHover} {
        background: ${t.buttonAccent.bgcFocus[0]};
      }}

      // focus-visible
      ${El.thiz.btnFocusVisible} {
        background: ${t.buttonAccent.bgcFocus[0]};
      }

      // disabled
      ${El.thiz.btnDisabled} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.prop.color}: ${t.elementDisabled.content[0]};
      }
    `
    
    
    export const secondary = (t:Theme)=>css`
      // normal
      ${El.thiz.btn} {
        background: ${t.buttonSecondary.bgc[0]};
        color: ${t.buttonSecondary.content[0]};
        ${Prop.prop.color}: ${t.buttonSecondary.content[0]};
      }
      ${El.thiz.border} {
        border: 1px solid;
        border-color: ${t.buttonSecondary.content[0]};
      }
      ${El.thiz.ripple} {
        ${Prop.prop.rippleColor}: ${t.ripple.contentOnTransparent[0]};
      }

      // hover
      ${hoverable}{ ${El.thiz.btnHover} {
        background: ${t.buttonSecondary.bgcFocus[0]};
      }}

      // focus-visible
      ${El.thiz.btnFocusVisible} {
        background: ${t.buttonSecondary.bgcFocus[0]};
      }

      // disabled
      ${El.thiz.btnDisabled} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.prop.color}: ${t.elementDisabled.content[0]};
      }
    `
    
    
    
    export const transparent = (t:Theme)=>css`
      // normal
      ${El.thiz.btn} {
        background: transparent;
        color: ${t.page.content[0]};
        ${Prop.prop.color}: ${t.page.content[0]};
      }
      ${El.thiz.border} {
        border: 1px solid;
        border-color: transparent;
      }
      ${El.thiz.ripple} {
        ${Prop.prop.rippleColor}: ${t.ripple.contentOnTransparent[0]};
      }

      // hover
      ${hoverable}{ ${El.thiz.btnHover} {
        background: ${t.buttonTransparent.bgcFocus[0]};
      }}

      // focus-visible
      ${El.thiz.btnFocusVisible} {
        background: ${t.buttonTransparent.bgcFocus[0]};
      }

      // disabled
      ${El.thiz.btnDisabled} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.prop.color}: ${t.elementDisabled.content[0]};
      }
    `
    
    
    export const danger = (t:Theme) => css`
      // normal
      ${El.thiz.btn} {
        background: ${t.elementDanger.bgc[0]};
        color: ${t.elementDanger.content[0]};
        ${Prop.prop.color}: ${t.elementDanger.content[0]};
      }
      ${El.thiz.ripple} {
        ${Prop.prop.rippleColor}: ${t.ripple.content[0]};
      }
      
      // hover
      ${hoverable}{ ${El.thiz.btnHover} {
        background: ${t.elementDanger.bgcFocus[0]};
      }}
      
      // focus-visible
      ${El.thiz.btnFocusVisible} {
        background: ${t.elementDanger.bgcFocus[0]};
      }
      
      // disabled
      ${El.thiz.btnDisabled} {
        background: ${t.elementDisabled.bgc[0]};
        color: ${t.elementDisabled.content[0]};
        ${Prop.prop.color}: ${t.elementDisabled.content[0]};
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
    ${El.thiz.btn} {
      color: ${t.buttonAccent.content2[0]};
      ${Prop.prop.color}: ${t.buttonAccent.content2[0]};
    }
  `
  export const roundedSmallAccent = (t:Theme) => css`
    ${common};
    ${Shape.roundedSmall};
    ${Color.accent(t)};
    ${El.thiz.btn} {
      color: ${t.buttonAccent.content2[0]};
      ${Prop.prop.color}: ${t.buttonAccent.content2[0]};
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
    ${El.thiz.btn} {
      height: 50px;
      width: 50px;
      //border-radius: 26%;
      border-radius: 999999px;
      padding: 14px;
      
      background: ${t.buttonMain.bgc[0]};
      color: ${t.buttonMain.content[0]};
      ${Prop.prop.color}: ${t.buttonMain.content[0]};
    }
    ${El.thiz.ripple} {
      ${Prop.prop.rippleMode}: center;
      ${Prop.prop.rippleColor}: ${t.ripple.content[0]};
    }
    ${El.thiz.icon} {
      ${Prop.prop.iconSize}: 100%;
      ${Prop.prop.iconColor}: ${t.buttonMain.content[0]};
    }
    
    // hover
    ${hoverable}{ ${El.thiz.btnHover} {
      background: ${t.buttonMain.bgcFocus[0]};
    }}

    // focus-visible
    ${El.thiz.btnFocusVisible} {
      background: ${t.buttonMain.bgcFocus[0]};
    }
    
    // disabled
    ${El.thiz.btnDisabled} {
      background: ${t.elementDisabled.bgc[0]};
      color: ${t.elementDisabled.content[0]};
      ${Prop.prop.color}: ${t.elementDisabled.content[0]};
    }
    ${El.thiz.iconDisabled} {
      ${Prop.prop.iconColor}: ${t.elementDisabled.content[0]};
    }
  `
  
  
  
  export const iconTransparent = (t:Theme) => css`
    ${icon(t)};
    // normal
    ${El.thiz.btn} {
      border-radius: 999999px;
      background: none;
      color: ${t.buttonAccent.bgc[0]};
      ${Prop.prop.color}: ${t.buttonAccent.bgc[0]};
    }
    ${El.thiz.ripple} {
      ${Prop.prop.rippleColor}: ${t.ripple.contentOnTransparent[0]};
    }
    ${El.thiz.icon} {
      ${Prop.prop.iconColor}: ${t.buttonAccent.bgc[0]};
    }

    // hover
    ${hoverable}{ ${El.thiz.btnHover} {
      background: ${t.buttonTransparent.bgcFocus[0]};
    }}

    // focus-visible
    ${El.thiz.btnFocusVisible} {
      background: ${t.buttonTransparent.bgcFocus[0]};
    }
  `
  
  
  export const iconBigTransparent = (t:Theme) => css`
    ${iconTransparent(t)};
    ${El.thiz.btn} {
      padding: 11px;
    }
  `
  
  
  
  
  
  
  
  
  
  export const nav = (t:Theme)=>css`
    ${common};
    // normal
    ${El.thiz.btn} {
      height: 100%;
      flex: 1;
      ${col};
      align-items: center;
      gap: 3px;
      padding: 5px 0 2px;

      background: none;
      color: ${t.buttonNav.content[0]};
      ${Prop.prop.color}: ${t.buttonNav.content[0]};
      
      ${Txt.small5};
    }
    ${El.thiz.ripple} {
      ${Prop.prop.rippleMode}: center;
      ${Prop.prop.rippleColor}: ${t.ripple.contentOnTransparent[0]};
    }
    ${El.thiz.icon} {
      ${Prop.prop.iconSize}: 100%;
      ${Prop.prop.iconColor}: ${t.buttonNav.content[0]};
    }
    
    // link active
    // IT IS WORKING !!!: a.active &.btnDotClass > iconDotClass
    a.active ${El.thiz.icon} {
      ${Prop.prop.iconColor}: ${t.buttonNav.contentAccent[0]};
    }
    
    // hover
    ${hoverable}{ ${El.thiz.btnHover} {
      background: ${t.buttonNav.bgcFocus[0]};
    }}

    // focus-visible
    ${El.thiz.btnFocusVisible} {
      background: ${t.buttonNav.bgcFocus[0]};
    }
  `
  
  
  
  
}