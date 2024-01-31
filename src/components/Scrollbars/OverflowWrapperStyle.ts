import { css } from '@emotion/react'




export namespace OverflowWrapperStyle {
  
  
  export const bigSizeScrollbars = css`
    &.rrainuiOverflowWrapper {
      > .rrainuiScrollbarOverlay {
        padding: 3px;
        
        > .rrainuiScrollbarTrack[data-direction=vertical] {
          width: 10px;
        }

        > .rrainuiScrollbarTrack[data-direction=horizontal] {
          height: 10px;
        }
      }
    }
  `
  
  
  
  
  export const page = css`
    ${bigSizeScrollbars};
    &.rrainuiOverflowWrapper {

      > .rrainuiScrollContainer {
        //place-content: stretch;
        //place-items: stretch;

        > .rrainuiScrollContentWrap {
          min-width: fit-content;
          width: 100%;

          min-height: fit-content;
          height: fit-content;
          flex: 1;
        }
      }
    }
  `
  
  
  
  
  export const middleSizeScrollbars = css`
    &.rrainuiOverflowWrapper {
      > .rrainuiScrollbarOverlay {
        > .rrainuiScrollbarTrack[data-direction=vertical] {
          width: 6px;
        }

        > .rrainuiScrollbarTrack[data-direction=horizontal] {
          height: 6px;
        }
      }
    }
  `
  
  
  
  
  export const list = css`
    ${middleSizeScrollbars};
    &.rrainuiOverflowWrapper {

      > .rrainuiScrollContainer {

        > .rrainuiScrollContentWrap {
          //min-width: 100%;
          //min-height: 100%;
          //width: fit-content;
          //height: fit-content;
          //max-width: 100%; max-height: 100%;
        }
      }
    }
  `
  
  
}