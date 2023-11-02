import { css } from '@emotion/react'
import { Themes } from 'src/utils/theme/Themes'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import onHover = EmotionCommon.onHover
import Theme = Themes.Theme
import col = EmotionCommon.col
import textLarge1 = EmotionCommon.textLarge2
import textSmall1 = EmotionCommon.textSmall1
import textNormal1 = EmotionCommon.textNormal1



export namespace ButtonStyle {
  
  
  const common = css`
    &.rrainuiButton {
      transition: background linear 300ms;
      overflow-wrap: anywhere;
    }
  `
  
  
  namespace Shape {
    
    export const bigRect = css`
      &.rrainuiButton {
        width: 100%;
        min-height: 50px;
        border-radius: 15px;
        padding: 8px 4px;
      }
    `
    export const smallRect = css`
      &.rrainuiButton {
        width: auto;
        min-height: 30px;
        border-radius: 10px;
        padding: 4px 6px;
        gap: 4px;
      }
    `
    
    export const rounded = css`
      &.rrainuiButton {
        width: fit-content;
        min-height: 40px;
        border-radius: 1000000px;
        padding: 8px 20px;
      }
    `
    
  }
  
  
  
  namespace Color {
    
    export const primary = (t:Theme) => css`
      &.rrainuiButton {
        background: ${t.button.primary.bgc[0]};
        color: ${t.button.primary.text[0]};
        
        .rrainuiRippleFrame {
          --ripple-color: ${t.button.primary.ripple[0]};
        }
  
        :active, :focus {}
        :focus-visible {
          background: ${t.button.primary.active[0]};
        }
        ${onHover(css`
          background: ${t.button.primary.hover[0]};
        `)};
  
        :disabled {
          background: ${t.button.primary.disabled.bgc[0]};
          color: ${t.button.primary.disabled.text[0]};
        }
      }
      &.rrainuiButton[data-error] > .rrainuiBorder {}
    `
    
    
    
    export const normal = (t:Theme) => css`
      &.rrainuiButton {
        background: ${t.element.normal.bgc[0]};
        color: ${t.element.normal.text[0]};
        --color: ${t.element.normal.text[0]};
        
        .rrainuiRippleFrame {
          --ripple-color: ${t.ambience.bgc[0]};
        }
  
        :focus {}
        :active, :focus-visible {
          background: ${t.element.normal.bgc[1]};
        }
        ${onHover(css`
          background: ${t.element.normal.bgc[1]};
        `)};
  
        :disabled {
          background: ${t.element.disabled.bgc[0]};
          color: ${t.element.disabled.text[0]};
        }
      }
      &.rrainuiButton[data-error] > .rrainuiBorder {}
    `
    
    
    export const danger = (t:Theme) => css`
      &.rrainuiButton {
        background: ${t.element.danger.bgc[0]};
        color: ${t.element.danger.text[0]};
        --color: ${t.element.danger.text[0]};
        
        .rrainuiRippleFrame {
          --ripple-color: ${t.ambience.bgc[0]};
        }
  
        :focus {}
        :active, :focus-visible {
          background: ${t.element.danger.bgc[1]};
        }
        ${onHover(css`
          background: ${t.element.danger.bgc[1]};
        `)};
  
        :disabled {
          background: ${t.element.disabled.bgc[0]};
          color: ${t.element.disabled.text[0]};
        }
      }
      &.rrainuiButton[data-error] > .rrainuiBorder {}
    `
    
    
  }
  
  
  
  export const bigRectPrimary = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${textLarge1};
    ${Color.primary(t)};
  `
  export const bigRectNormal = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${textLarge1};
    ${Color.normal(t)};
  `
  export const bigRectDanger = (t:Theme) => css`
    ${common};
    ${Shape.bigRect};
    ${textLarge1};
    ${Color.danger(t)};
  `
  
  
  export const smallRectNormal = (t:Theme) => css`
    ${common};
    ${Shape.smallRect};
    ${textNormal1};
    ${Color.normal(t)};
  `
  
  
  export const roundedNormal = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${textSmall1};
    ${Color.normal(t)};
    &.rrainuiButton {
      color: ${t.element.normal.text2[0]};
      --color: ${t.element.normal.text2[0]};
    }
  `
  
  export const roundedDanger = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${textSmall1};
    ${Color.danger(t)};
  `
  
  export const roundedSecondary = (t:Theme) => css`
    ${common};
    ${Shape.rounded};
    ${textSmall1};
    ${Color.normal(t)};
    &.rrainuiButton {
      color: ${t.element.normal.text2[0]};
    }
  `
  
  
  
  
  export const icon = (t:Theme) => css`
    &.rrainuiButton {
      //min-height: 50px;
      //min-width: 50px;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      padding: 14px;

      transition: background linear 300ms;
      
      background: ${t.button.primary.bgc[0]};
      color: ${t.button.primary.text[0]};
      
      .rrainuiRippleFrame {
        --ripple-color: ${t.button.primary.ripple[0]};
        --ripple-mode: center;
      }

      :active, :focus {}
      :focus-visible {
        background: ${t.button.primary.active[0]};
      }
      ${onHover(css`
        background: ${t.button.primary.hover[0]};
      `)};

      .rrainuiIcon {
        --icon-color: ${t.button.primary.text[0]};
        --icon-size: 100%;
      }

      :disabled {
        background: ${t.button.primary.disabled.bgc[0]};
        color: ${t.button.primary.disabled.text[0]};

        .rrainuiIcon {
          --icon-color: ${t.button.primary.disabled.text[0]};
        }
      }
    }
    &.rrainuiButton[data-error] > .rrainuiBorder {}
  `
  
  
  // todo separate theme subobject for icon transparent
  export const iconTransparent = (t:Theme) => css`
    ${icon(t)};
    &.rrainuiButton {
      padding: 11px;
      
      background: none;
      color: ${t.button.secondary.bgc[0]};

      .rrainuiIcon {
        --icon-color: ${t.button.secondary.bgc[0]};
      }
      
      .rrainuiRippleFrame {
        --ripple-color: ${t.input.ripple[0]};
        --ripple-mode: center;
      }

      :focus-visible {
        background: ${t.input.iconActive[0]};
      }
      ${onHover(css`
        background: ${t.input.iconHover[0]};
      `)};
    }
  `
  
  
  
  
  
  
  export const nav = (t:Theme)=>css`
    &.rrainuiButton {
      height: 100%;
      flex: 1;
      ${col};
      align-items: center;
      gap: 2px;
      padding: 6px 0 2px;

      transition: background linear 300ms;

      color: ${t.nav.button.text[0]};
      font-weight: 400;
      font-size: 10px;
      line-height: 129%;
      a.active & {
        color: ${t.nav.button.selected.text[0]};
      }
      
      .rrainuiIcon {
        --icon-size: 100%;
        --icon-color: ${t.nav.button.text[0]};
      }
      a.active & .rrainuiIcon {
        --icon-color: ${t.nav.button.selected.text[0]};
      }
      
      .rrainuiRippleFrame {
        --ripple-color: ${t.nav.button.ripple[0]};
        --ripple-mode: center;
      }

      :active, :focus {}
      :focus-visible {
        background: ${t.nav.button.active[0]};
      }
      ${onHover(css`
        background: ${t.nav.button.hover[0]};
      `)};

      :disabled {}
    }
    &.rrainuiButton[data-error] > .rrainuiBorder {}
  }`
  
  
  
  
}