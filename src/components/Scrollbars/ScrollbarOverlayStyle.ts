import { css } from '@emotion/react'
import { CommonStyle } from 'src/views/CommonStyle'
import { ScrollbarStyle } from 'src/views/Scrollbar/ScrollbarStyle'
import Elem = CommonStyle.Elem




export namespace ScrollbarOverlayStyle {
  
  
  
  export const ElRaw = function(){
    const overlay = new Elem('rrainuiScrollbarOverlay',{})
    return { root: overlay, overlay } as const
  }()
  
  export const El = function(){
    const overlay = new Elem(ElRaw.overlay.name,{})
    return { root: overlay, overlay } as const
  }()
  
  
  
  export const page = css`
    ${El.overlay.thisSel}{
      padding: 1px;
      
      > ${ScrollbarStyle.El.track.s.vertical.sel}{
        width: 7px;
      }
      > ${ScrollbarStyle.El.track.s.horizontal.sel}{
        height: 7px;
      }
    }
  `
  
  
  
}