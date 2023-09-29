import { css } from '@emotion/react'
import { Themes } from 'src/theme/Themes'
import { EmotionCommon } from 'src/styles/EmotionCommon'


export namespace ButtonStyle {
  import onHover = EmotionCommon.onHover
  import Theme = Themes.Theme
  import col = EmotionCommon.col
  
  
  const buttonCommon = css`
    &.rrainuiButton {
      width: 100%;
      min-height: 50px;
      border-radius: 15px;
      padding: 8px 4px;

      transition: background linear 300ms;

      word-break: break-word;
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
      letter-spacing: 0.05em;
    }
  `
  
  export const buttonPrimary = (t:Theme) => css`
    ${buttonCommon};
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
  
  
  export const buttonSecondary = (t:Theme) => css`
    ${buttonCommon};
    &.rrainuiButton {
      background: ${t.button.secondary.bgc[0]};
      color: ${t.button.secondary.text[0]};
      
      .rrainuiRippleFrame {
        --ripple-color: ${t.button.secondary.ripple[0]};
      }

      :focus {}
      :active, :focus-visible {
        background: ${t.button.secondary.active[0]};
      }
      ${onHover(css`
          background: ${t.button.secondary.hover[0]};
      `)};

      :disabled {
        background: ${t.button.secondary.disabled.bgc[0]};
        color: ${t.button.secondary.disabled.text[0]};
      }
    }
    &.rrainuiButton[data-error] > .rrainuiBorder {}
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