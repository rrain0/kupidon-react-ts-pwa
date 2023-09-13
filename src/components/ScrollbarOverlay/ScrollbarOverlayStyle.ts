import { css } from '@emotion/react'



// todo make >.class everywhere
export namespace ScrollbarOverlayStyle {
  
  export const page = css`
    &.rrainuiScrollOverlay{
      width: 100%; height: 100%;
      
      >.rrainuiScrollContainer {
        width: 100%; height: 100%;
        
        >.rrainuiScrollContentWrap{
          min-height: 100%; min-width: 100%;
          height: fit-content; width: fit-content;
        }
      }
      
      >.rrainuiScrollbarsContainer{
        padding: 6px;
        
        /*
        >.rrainuiScrollbarTrack[data-direction=vertical]{
        
        }
        */
      }
    }
  `
  
  
  
  
  export const list = css`
    &.rrainuiScrollOverlay{
      width: 100%; height: 100%;
      
      >.rrainuiScrollContainer {
        width: 100%; height: 100%;
        
        >.rrainuiScrollContentWrap{
          min-height: 100%; min-width: 100%;
          height: fit-content; width: fit-content;
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