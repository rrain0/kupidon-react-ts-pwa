import { css } from "@emotion/react"


export namespace EmotionCommon {
  
  export const reset = css`
    box-sizing: border-box;
    background: none;
    border: none;
    outline: none;
    box-shadow: none;
    margin: 0;
    padding: 0;
    //min-width: 0;
    //min-height: 0;
  `
  export const allDefault = css`
    all: unset;
    ${reset}
  `
  
  
  export const abs = css`
    position: absolute;
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
  export const centerAll = css`
    display: grid;
    place-items: center;
    grid: 'c';
    & > * { grid-area: c }
  `
  export const centerV = css`
    display: grid;
    place-items: center start;
  `
  export const centerStart = centerV
  
  
  
  export const mobileFullWidth = css`
    @media (max-width: 550px) {
      width: 100%;
    }
  `
  
  
  
  
  
  export const page = css`
    width: 100%;
    background: #F8F8F8;
    ${col};
    align-items: center;
  `
  
  export const pageElement = css`
    width: clamp(200px, 100%, 1920px);
    padding: 0 64px 0 64px;
    @media (max-width: 900px) {
      padding: 0 16px 0 16px;
    }
  `
  
  
  export const resetInput = css`
    ${reset}
    &, &:hover, &:active, &:focus-visible, &:focus {
      outline: inherit;
      box-shadow: inherit;
      border: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    &::placeholder {
      opacity: 1;
    }
  `
  export const resetButton = css`
    ${reset}
    &, &:hover, &:active, &:focus-visible, &:focus {
      outline: inherit;
      box-shadow: inherit;
      border: inherit;
      -webkit-tap-highlight-color: transparent;
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
  
  
  
  
  export const hideScrollbar = css`
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `
}






