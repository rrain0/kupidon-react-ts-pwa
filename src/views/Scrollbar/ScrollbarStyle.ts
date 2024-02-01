import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { CommonStyle } from 'src/views/CommonStyle'
import hoverable = EmotionCommon.hoverable
import DataAttr = CommonStyle.DataAttr
import Elem0 = CommonStyle.Elem0
import combineStates = CommonStyle.combineStates




export namespace ScrollbarStyle {
  
  
  
  export const Attr = {
    direction: new DataAttr('direction',['vertical','horizontal']),
    active: new DataAttr('active',[]),
  }
  
  export const ElRaw = function(){
    const track = new Elem0('rrainuiScrollbarTrack',{})
    const thumbBox = new Elem0('rrainuiScrollbarThumbBox', {})
    const thumb = new Elem0('rrainuiScrollbarThumb', {})
    return { root: track, track, thumbBox, thumb } as const
  }()
  
  export const El = function(){
    const track = new Elem0(ElRaw.track.name,{
      vertical: Attr.direction.s.vertical,
      horizontal: Attr.direction.s.horizontal,
      active: combineStates(CommonStyle.active, Attr.active),
      hover: CommonStyle.hover,
    })
    const thumbBox = track.selectWithParentState('>', ElRaw.thumbBox)
    const thumb = thumbBox.selectWithParentState('>', ElRaw.thumb)
    return { root: track, track, thumbBox, thumb } as const
  }()
  
  
  
  
  export const scrollbar = (t: AppTheme.Theme) => css`
    ${El.track.thisSel}{
      border-radius: 999999px;
      background: ${t.scrollbar.track};
    }
    ${El.track.s.vertical.thisSel}{
      width: 16px; height: 100%;
    }
    ${El.track.s.horizontal.thisSel}{
      width: 100%; height: 16px;
    }
    ${El.thumbBox.thisSel}{
      //padding: 1px 2px;
    }
    ${El.thumb.thisSel}{
      border-radius: 999999px;
      background: ${t.scrollbar.thumb};
    }
    
    // hover
    ${hoverable} { ${El.thumb.s.hover.thisSel}{
      background: ${t.scrollbar.thumbActive};
    }}

    // active
    ${El.thumb.s.active.thisSel}{
      background: ${t.scrollbar.thumbActive};
    }
  `
  
  
  
  
  
}