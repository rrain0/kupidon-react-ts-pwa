import { css } from '@emotion/react'



// todo make >.class everywhere
export namespace ScrollbarOverlayStyle {
  
  export const page = css`
    &.rrainuiScrollOverlay{
      
      >.rrainuiScrollContainer {
        //place-content: stretch;
        //place-items: stretch;
        
        >.rrainuiScrollContentWrap{
          min-width: fit-content;
          width: 100%;
          
          min-height: fit-content;
          height: fit-content;
          flex: 1;
        }
      }
      
      >.rrainuiScrollbarsContainer{
        padding: 3px;
        >.rrainuiScrollbarTrack[data-direction=vertical]{
          width: 10px;
        }
        >.rrainuiScrollbarTrack[data-direction=horizontal]{
          height: 10px;
        }
      }
    }
  `
  
  
  
  
  export const list = css`
    &.rrainuiScrollOverlay{
      
      >.rrainuiScrollContainer {
        
        >.rrainuiScrollContentWrap{
          min-width: 100%; min-height: 100%;
          width: fit-content; height: fit-content;
          //max-width: 100%; max-height: 100%;
        }
      }
      
      >.rrainuiScrollbarsContainer{
        >.rrainuiScrollbarTrack[data-direction=vertical]{
          width: 6px;
        }
        >.rrainuiScrollbarTrack[data-direction=horizontal]{
          height: 6px;
        }
      }
    }
  `
  
  
}