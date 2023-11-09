import { css, SerializedStyles } from '@emotion/react'
import { Themes } from 'src/utils/theme/Themes'


export namespace EmotionCommon {
  
  export const abs = css`
    position: absolute;
    inset: 0; // top: 0; right: 0; bottom: 0; left: 0;
  `
  
  export const fixedBottom = css`
    position: fixed;
    right: 0; bottom: 0; left: 0;
  `
  
  export const fixed = css`
    position: fixed;
    inset: 0; // top: 0; right: 0; bottom: 0; left: 0;
  `
  
  export const row = css`
    display: flex;
    flex-flow: row nowrap;
  `
  
  export const rowWrap = css`
    display: flex;
    flex-flow: row wrap;
  `
  
  export const col = css`
    display: flex;
    flex-flow: column nowrap;
  `
  
  export const center = css`
    display: grid;
    place-items: center;
  `
  export const centerContent = css`
    display: grid;
    place-content: center;
  `
  export const centerAll = css`
    display: grid;
    place-items: center;
    grid: 'c';
    & > * { grid-area: c; }
  `
  export const centerV = css`
    display: grid;
    place-items: center start;
  `
  export const centerStart = centerV
  export const stretch = css`
    display: grid;
    place-items: stretch;
    place-content: stretch;
  `
  export const stretchAll = css`
    display: grid;
    place-items: stretch;
    grid: 'c';
    & > * { grid-area: c; }
  `
  export const wrapper = css`
    display: grid;
    min-width: fit-content; min-height: fit-content;
    width: fit-content; height: fit-content;
    max-width: fit-content; max-height: fit-content;
  `
  export const fill = css`
    min-width: 100%; min-height: 100%;
    width: 100%; height: 100%;
    max-width: 100%; max-height: 100%;
  `
  
  
  
  
  export const mobileFullWidth = css`
    @media (max-width: 480px) {
      width: 100%;
    }
  `
  
  
  export const onHover = (cssStyle: SerializedStyles)=>css`
    @media (hover: hover) and (pointer: fine) { :hover {
      ${cssStyle};
    } }
  `
  
  export const mobileWidth = (cssStyle: SerializedStyles)=>css`
    @media only screen and (max-width: 480px) {
      ${cssStyle};
    }
  `
  
  
  
  
  export const bgcBorderMask = css`
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0) border-box;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0) border-box;

    -webkit-mask-composite: xor;
    mask-composite: exclude;
  `
  
  
  
  
  
  export const reset = css`
    box-sizing: border-box;
    background: none;
    border: none;
    outline: none;
    box-shadow: none;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
    //min-width: 0;
    //min-height: 0;
  `
  
  
  
  export const resetInput = css`
    ${reset}
    :hover, :active, :focus-visible, :focus {
      outline: none;
      box-shadow: none;
      border: none;
    }
    ::placeholder {
      opacity: 1;
    }
  `
  export const resetButton = css`
    ${reset}
    :hover, :active, :focus-visible, :focus {
      outline: none;
      box-shadow: none;
      border: none;
    }
  `
  
  export const resetTextarea = css`
    ${reset}
    :hover, :active, :focus-visible, :focus {
      outline: none;
      box-shadow: none;
      border: none;
    }
    ::placeholder {
      opacity: 1;
    }
  `
  export const resetUl = css`
    ${reset};
    ${col};
    list-style: none;
  `
  export const resetPseudoElement = css`
    ${reset};
    ${row};
    content: '';
  `
  export const resetA = css`
    display: contents;
    text-decoration: none;
    color: inherit;
  `
  export const resetH = css`
    font-weight: inherit;
    font-size: inherit;
  `
  
  
  
  
  export const hideScrollbar = css`
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `
  
  
  
  
  
  export const textLarge3 = css`
    font-weight: 500;
    font-size: 24px;
    line-height: 150%;
    letter-spacing: 0.05em;
  `
  
  export const textLarge2 = css`
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
    letter-spacing: 0.05em;
  `
  
  export const textLarge1 = css`
    font-weight: 500;
    font-size: 16px;
    line-height: 129%;
    letter-spacing: 0.05em;
  `
  
  export const textNormal1 = css`
    font-weight: 400;
    font-size: 16px;
    line-height: 129%;
  `
  
  export const textSmall1 = css`
    font-weight: 400;
    font-size: 15px;
    line-height: 129%;
  `
  
  export const textSmall2 = css`
    font-weight: 400;
    font-size: 14px;
    line-height: 129%;
  `
  
  
  
  
  
}






