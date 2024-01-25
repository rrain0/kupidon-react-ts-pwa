import React, { CSSProperties } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef
import Callback1 = TypeUtils.Callback1




export namespace ReactUtils {
  
  
  // todo hack fix
  // Sometimes 'click' is not fired for a couple seconds
  // despite 'pointerdown' & 'pointerup' events are fired normally.
  // WARNING!!! It fires before actual click events,
  // so if you change view after this so it can't capture clicks,
  // the underlying view captures click along with this view simultaneously.
  export const onPointerClick =
  <E extends Element>
  (callback: Callback1<React.PointerEvent<E>>)=>{
    const pointers = new Set<number>()
    return {
      onPointerDown: (ev: React.PointerEvent<E>)=>{
        if (!pointers.has(ev.pointerId)){
          ev.currentTarget.releasePointerCapture(ev.pointerId)
          pointers.add(ev.pointerId)
        }
      },
      onPointerUp: (ev: React.PointerEvent<E>)=>{
        if (pointers.has(ev.pointerId)) {
          callback(ev)
          //console.log('pointerup')
          pointers.delete(ev.pointerId)
        }
      },
      // 'out' is 'leave' + 'cancel'
      onPointerOut: (ev: React.PointerEvent<E>)=>{
        //console.log('pointerout')
        pointers.delete(ev.pointerId)
      },
    } as const
  }
  
  
  
  const stopReactEventPropagation = (ev: React.BaseSyntheticEvent)=>{
    ev.stopPropagation()
    //ev.preventDefault()
    //console.log('ev.type',ev.type)
  }
  export const stopPointerAndMouseEvents = ()=>{
    return {
      onPointerDown: stopReactEventPropagation,
      onPointerMove: stopReactEventPropagation,
      onPointerUp: stopReactEventPropagation,
      onPointerOut: stopPointerAndMouseEvents,
      onPointerCancel: stopReactEventPropagation,
      
      onPointerEnter: stopPointerAndMouseEvents,
      onPointerOver: stopPointerAndMouseEvents,
      onPointerLeave: stopPointerAndMouseEvents,
      
      onTouchStart: stopReactEventPropagation,
      onTouchMove: stopReactEventPropagation,
      onTouchEnd: stopReactEventPropagation,
      onTouchCancel: stopReactEventPropagation,
      
      onClick: stopReactEventPropagation,
      
      onWheel: stopReactEventPropagation,
    } as const
  }
  
  
  // React.memo wrapper if component's generics are not consumed properly by ts
  export const memo = <C>(Component: C): C => {
    // @ts-ignore
    return React.memo(Component)
  }
  
  
  export type CssProps = PartialUndef<{
    className: string
    style: CSSProperties
  }>
  
  
  export const combineRefs =
  <T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T>=>
  (instance: T | null)=>{
    refs.forEach(ref=>{
      if (typeof ref === 'function')
        ref(instance)
      else if (ref && typeof ref === 'object')
        (ref.current as T | null) = instance
    })
  }
  
  
}



