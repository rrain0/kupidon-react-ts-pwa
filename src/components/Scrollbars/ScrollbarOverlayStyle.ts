import { css } from '@emotion/react'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { CommonStyle } from 'src/views/CommonStyle'
import { ScrollbarStyle } from 'src/views/Scrollbar/ScrollbarStyle'
import Elem0 = CommonStyle.Elem0
import ObjectMap = ObjectUtils.ObjectMap




export namespace ScrollbarOverlayStyle {
  
  
  
  export const ElRaw = function(){
    const overlay = new Elem0('rrainuiScrollbarOverlay',{})
    
    // todo
    const scrollbar = ScrollbarStyle.ElRaw
    
    // todo
    return { root: overlay, overlay, scrollbar } as const
  }()
  
  export const El = function(){
    const overlay = new Elem0(ElRaw.overlay.name,{})
    
    // todo
    const scrollbar = ObjectMap<typeof ScrollbarStyle.El, typeof ScrollbarStyle.El>(
      ScrollbarStyle.El,
      ([key,value])=>[key, overlay.selectWithChildState('>',value)]
    )
    
    // todo
    return { root: overlay, overlay, scrollbar } as const
  }()
  
  
  
  export const page = css`
    ${El.overlay.thisSel}{
      padding: 1px;
    }
    ${El.scrollbar.track.s.vertical.thisSel}{
      width: 7px;
    }
    ${El.scrollbar.track.s.horizontal.thisSel}{
      height: 7px;
    }
  `
  
  
  
}