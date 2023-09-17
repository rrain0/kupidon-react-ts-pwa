/** @jsxImportSource @emotion/react */
import classNames from 'classnames'
import React, { useCallback, useImperativeHandle, useLayoutEffect, useRef } from 'react'
import { ElementProps, GetDimensions } from 'src/utils/GetDimensions'
import css from './Ripple.module.scss'
import { TypeUtils } from 'src/utils/TypeUtils'
import empty = TypeUtils.empty
import {ReactUtils} from "src/utils/ReactUtils"
import ReactMemoTyped = ReactUtils.ReactMemoTyped



export type RippleProps = JSX.IntrinsicElements['div'] & {
  rippleDuration?: number|empty // ripple animation duration per 200px
  mode?: 'center'|'cursor'|empty
  rippleColor?: string|empty
  targetElement: React.RefObject<HTMLElement>
}
type CursorInfo = {
  clientX: number
  clientY: number
  pointerId?: number|empty
}
const Ripple = React.forwardRef<HTMLDivElement, RippleProps>(
  (props, forwardedRef) => {
    
    let {
      rippleDuration,
      mode,
      rippleColor,
      targetElement,
      className,
      ...restProps
    } = props
    
    const rippleFrameRef = useRef<HTMLDivElement>(null)
    const rippleViewRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(forwardedRef, ()=>rippleFrameRef.current!,[])
    
    
    const showRipple = useCallback(
      (ev?: CursorInfo) => {
        const rippleFrame = rippleFrameRef.current
        const rippleView = rippleViewRef.current
        if (rippleFrame && rippleView){
          rippleView.classList.remove(css.rippleHide, css.rippleShow)
          
          const mode = function(){
            const modes = ['center','cursor']
            let mode: any = ElementProps(rippleFrame)
              .cssPropValue('--ripple-mode')
            if (!modes.includes(mode)) mode = props.mode
            if (!ev) mode = 'center'
            if (!modes.includes(mode)) mode = 'center'
            return mode as 'center'|'cursor'
          }()
          
          const dimens = ElementProps(rippleFrame)
          const el = {
            clientX: dimens.left,
            clientY: dimens.top,
            w: dimens.widthRounded,
            h: dimens.heightRounded,
          }
          const d = function(){
            switch (mode){
              case 'cursor': return {
                toTop: ev!.clientY-el.clientY,
                toRight: el.w-(ev!.clientX-el.clientX),
                toBottom: el.h-(ev!.clientY-el.clientY),
                toLeft: ev!.clientX-el.clientX
              }
              case 'center': default: return {
                toTop: el.h/2,
                toRight: el.w/2,
                toBottom: el.h/2,
                toLeft: el.w/2,
              }
            }
          }()
          const dxd = {
            toTop: d.toTop*d.toTop,
            toRight: d.toRight*d.toRight,
            toBottom: d.toBottom*d.toBottom,
            toLeft: d.toLeft*d.toLeft,
          }
          const ripple = function(){
            const radius = Math.max(
              Math.sqrt(dxd.toTop+dxd.toLeft), // расстояние от точки касания до левого верхнего угла
              Math.sqrt(dxd.toTop+dxd.toRight), // расстояние от точки касания до правого верхнего угла
              Math.sqrt(dxd.toBottom+dxd.toRight), // расстояние от точки касания до правого нижнего угла
              Math.sqrt(dxd.toBottom+dxd.toLeft), // расстояние от точки касания до левого нижнего угла
            )
            return {
              radius: radius,
              left: d.toLeft - radius,
              top: d.toTop - radius,
            }
          }()
          
          // console.log('ev.clientY',ev.clientY)
          // console.log('ev.clientX',ev.clientX)
          // console.log('el',el)
          // console.log('d',d)
          // console.log('dxd',dxd)
          // console.log('ripple',ripple)
          
          const dur = props.rippleDuration ?? 500
          
          const style = rippleFrame.style
          props.rippleColor && style.setProperty('--ripple-color', props.rippleColor)
          style.setProperty(
            '--ripple-animation-duration',
            Math.max(400, dur * ripple.radius/200) + 'ms'
          )
          style.setProperty(
            '--dissolve-animation-duration',
            Math.max(500, (dur+100) * ripple.radius/200) + 'ms'
          )
          style.setProperty('--ripple-top', ripple.top+'px')
          style.setProperty('--ripple-left', ripple.left+'px')
          style.setProperty('--ripple-w', ripple.radius*2+'px')
          style.setProperty('--ripple-h', ripple.radius*2+'px')
          
          rippleView.classList.add(css.rippleShow)
        }
        
      },
      [rippleFrameRef.current, rippleViewRef.current]
    )
    
    const hideRipple = useCallback(
      ()=>{
        const rippleView = rippleViewRef.current
        if (rippleView){
          rippleView.classList.remove(css.rippleHide)
          rippleView.classList.add(css.rippleHide)
        }
      },
      [rippleViewRef.current]
    )
    
    
    useLayoutEffect(
      ()=>{
        const target = props.targetElement.current
        if (target){
          target.addEventListener('pointerdown',showRipple)
          target.addEventListener('pointerup',hideRipple)
          target.addEventListener('pointerout',hideRipple) // 'out' is 'leave' + 'cancel'
          return ()=>{
            target.removeEventListener('pointerdown',showRipple)
            target.removeEventListener('pointerup',hideRipple)
            target.removeEventListener('pointerout',hideRipple)
          }
        }
      },
      [
        props.targetElement,
        showRipple, hideRipple,
      ]
    )
    
    
    
    return <div
      {...restProps}
      ref={rippleFrameRef}
      className={classNames(css.rippleFrame, className, 'rrainuiRippleFrame')}
    >
      <div
        ref={rippleViewRef}
        className={classNames(css.rippleView, 'rrainuiRippleView')}
      />
    </div>
  })
export default ReactMemoTyped(Ripple)