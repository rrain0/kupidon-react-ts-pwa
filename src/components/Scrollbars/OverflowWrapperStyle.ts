import { css } from '@emotion/react'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { CommonStyle } from 'src/views/CommonStyle'
import Elem = CommonStyle.Elem0
import ObjectMap = ObjectUtils.ObjectMap




export namespace OverflowWrapperStyle {
  
  
  
  export const ElRaw = function(){
    const wrapper = new Elem('rrainuiOverflowWrapper',{})
    const container = new Elem('rrainuiScrollContainer',{})
    const content = new Elem('rrainuiScrollContentWrap',{})
    
    // todo
    //const overlay = ScrollbarOverlayStyle.ElRaw
    
    // todo
    return { root: wrapper, wrapper, container, content/* , overlay */ } as const
  }()
  
  export const El = function(){
    const wrapper = new Elem(ElRaw.wrapper.name,{})
    const container = wrapper.selectWithParentState('>', ElRaw.container)
    const content = container.selectWithParentState('>', ElRaw.content)
    
    // todo
    /* const overlay = ObjectMap<typeof ScrollbarOverlayStyle.El, typeof ScrollbarOverlayStyle.El>(
      ScrollbarOverlayStyle.El,
      ([key,value])=>[key, wrapper.selectWithChildState('>',value)]
    ) */
    
    // todo
    return { root: wrapper, wrapper, container, content/* , overlay */ } as const
  }()
  
  //console.log('El.overlay',El.overlay)
  
  
  
  
  /* ${El.overlay.overlay.thisSel}{
   padding: 3px;
   }
   ${El.overlay.scrollbar.track.s.vertical.thisSel}{
   width: 10px;
   }
   ${El.overlay.scrollbar.track.s.horizontal.thisSel}{
   height: 10px;
   } */
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