import { css } from '@emotion/react'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import { CommonStyle } from 'src/views/CommonStyle'
import { ScrollbarStyle } from 'src/views/Scrollbar/ScrollbarStyle'
import Elem = CommonStyle.Elem




export namespace OverflowWrapperStyle {
  
  
  
  
  export const El = function(){
    const wrapper = new Elem('rrainuiOverflowWrapper',{})
    const container = wrapper.upFor('>', new Elem('rrainuiScrollContainer',{}))
    const content = container.upFor('>', new Elem('rrainuiScrollContentWrap',{}))
    
    
    const scrollbarOverlay = wrapper.upFor('>',ScrollbarOverlayStyle.El.overlay)
    
    const scrollbarTrack = scrollbarOverlay.upFor('>',ScrollbarStyle.El.track)
    const scrollbarThumbBox = scrollbarTrack.upFor('>',ScrollbarStyle.El.thumbBox)
    const scrollbarThumb = scrollbarThumbBox.upFor('>',ScrollbarStyle.El.thumb)
    
    return { root: wrapper, wrapper, container, content,
      scrollbarOverlay, scrollbarTrack, scrollbarThumbBox, scrollbarThumb,
    } as const
  }()
  
  
  
  
  
  export const bigSizeScrollbars = css`
    ${El.scrollbarOverlay.thiz()}{
      padding: 3px;
    }
    ${El.scrollbarTrack.thiz(El.scrollbarTrack.s('vertical'))}{
      width: 10px;
    }
    ${El.scrollbarTrack.thiz(El.scrollbarTrack.s('horizontal'))}{
      height: 10px;
    }
  `
  
  
  
  
  export const page = css`
    ${bigSizeScrollbars};
    ${El.content.thiz()}{
      min-width: fit-content;
      width: 100%;

      min-height: fit-content;
      height: fit-content;
      flex: 1;
    }
  `
  
  
  
  export const middleSizeScrollbars = css`
    ${El.scrollbarOverlay.thiz()}{
      //padding: 3px;
    }
    ${El.scrollbarTrack.thiz(El.scrollbarTrack.s('vertical'))}{
      width: 6px;
    }
    ${El.scrollbarTrack.thiz(El.scrollbarTrack.s('horizontal'))}{
      height: 6px;
    }
  `
  
  
  
  
  export const list = css`
    ${middleSizeScrollbars};
    ${El.content.thiz()}{
      //min-width: 100%;
      //min-height: 100%;
      //width: fit-content;
      //height: fit-content;
      //max-width: 100%; max-height: 100%;
    }
  `
  
  
}