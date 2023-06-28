import React, { useImperativeHandle, useRef } from "react";
import {GetDimensions} from "src/utils/GetDimensions";
import css from './Ripple.module.scss'
import {Utils} from "src/utils/Utils";
import empty = Utils.empty;
import {ReactUtils} from "src/utils/ReactUtils";
import ReactMemoTyped = ReactUtils.ReactMemoTyped;



export type RippleProps = JSX.IntrinsicElements['div'] & {
  rippleDuration?: number|empty // ripple animation duration per 200px
  mode?: 'center'|'cursor'|empty
  rippleColor?: string|empty
}
type CursorInfo = {
  clientX: number
  clientY: number
  pointerId?: number|empty
}
export type RippleRef = HTMLDivElement & {
  showRipple: (cursorPosition?: CursorInfo)=>void
  hideRipple: ()=>void
}
const Ripple = React.forwardRef<RippleRef, RippleProps>(
(props, forwardedRef) => {
  
  
  const rippleViewRef = useRef<RippleRef>(null)
  useImperativeHandle(forwardedRef, ()=>{
    rippleViewRef.current!.showRipple = showRipple
    rippleViewRef.current!.hideRipple = hideRipple
    return rippleViewRef.current!
  },[])
  
  
  const rippleFrameRef = useRef<HTMLDivElement>(null)
  
  
  const showRipple = (ev?: CursorInfo) => {
    let mode = props.mode ?? 'center'
    if (!ev) mode = 'center'
    const rippleFrame = rippleFrameRef.current!
    const rippleView = rippleViewRef.current!
    
    //ev?.pointerId && rippleFrame.setPointerCapture(ev.pointerId) // prevents pointer lost when outside a view
    rippleView.classList.remove(css.rippleHide, css.rippleShow)
    
    const dimens = new GetDimensions(rippleFrame)
    const el = {
      clientX: dimens.left,
      clientY: dimens.top,
      w: dimens.widthRounded,
      h: dimens.heightRounded,
    }
    let d
    if (mode==='cursor'){
      d = {
        toTop: ev!.clientY-el.clientY,
        toRight: el.w-(ev!.clientX-el.clientX),
        toBottom: el.h-(ev!.clientY-el.clientY),
        toLeft: ev!.clientX-el.clientX
      }
    } else if (mode==='center'){
      d = {
        toTop: el.h/2,
        toRight: el.w/2,
        toBottom: el.h/2,
        toLeft: el.w/2,
      }
    }
    const dxd = {
      toTop: d.toTop*d.toTop,
      toRight: d.toRight*d.toRight,
      toBottom: d.toBottom*d.toBottom,
      toLeft: d.toLeft*d.toLeft,
    }
    const ripple: any = {
      radius: Math.max(
        Math.sqrt(dxd.toTop+dxd.toLeft), // расстояние от точки касания до левого верхнего угла
        Math.sqrt(dxd.toTop+dxd.toRight), // расстояние от точки касания до правого верхнего угла
        Math.sqrt(dxd.toBottom+dxd.toRight), // расстояние от точки касания до правого нижнего угла
        Math.sqrt(dxd.toBottom+dxd.toLeft), // расстояние от точки касания до левого нижнего угла
      ),
    }
    ripple.left = d.toLeft - ripple.radius
    ripple.top = d.toTop - ripple.radius
    
    // console.log('ev.clientY',ev.clientY)
    // console.log('ev.clientX',ev.clientX)
    // console.log('el',el)
    // console.log('d',d)
    // console.log('dxd',dxd)
    // console.log('ripple',ripple)
    
    const dur = props.rippleDuration ?? 500
    
    const st = rippleView.style
    props.rippleColor && st.setProperty('--ripple-color', props.rippleColor)
    st.setProperty('--ripple-top', ripple.top+'px')
    st.setProperty('--ripple-left', ripple.left+'px')
    st.setProperty('--ripple-w', ripple.radius*2+'px')
    st.setProperty('--ripple-h', ripple.radius*2+'px')
    st.setProperty('--ripple-animation-duration', dur * ripple.radius/200  + 'ms')
    st.setProperty('--dissolve-animation-duration', (dur+100) * ripple.radius/200  + 'ms')
    
    // rippleView.style.top = ripple.top+'px'
    // rippleView.style.left = ripple.left+'px'
    // rippleView.style.width = ripple.radius*2+'px'
    // rippleView.style.height = ripple.radius*2+'px'
  
    rippleView.classList.add(css.rippleShow)
  }
  const hideRipple = () => {
    const rippleView = rippleViewRef.current!
    rippleView.classList.remove(css.rippleHide)
    rippleView.classList.add(css.rippleHide)
  }
  
  
  
  return <div className={css.rippleFrame} ref={rippleFrameRef}>
    <div ref={rippleViewRef} className={css.rippleView}/>
  </div>
})
export default ReactMemoTyped(Ripple)