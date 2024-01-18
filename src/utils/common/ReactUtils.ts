import React, { BaseSyntheticEvent, CSSProperties } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef
import Callback1 = TypeUtils.Callback1




export namespace ReactUtils {
  
  
  // todo hack
  // use it if click does not work properly
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
          pointers.delete(ev.pointerId)
        }
      },
      // 'out' is 'leave' + 'cancel'
      onPointerOut: (ev: React.PointerEvent<E>)=>{
        pointers.delete(ev.pointerId)
      },
    } as const
  }
  
  
  
  const stopReactEventPropagation = (ev: React.BaseSyntheticEvent)=>ev.stopPropagation()
  export const stopPointerAndMouseEvents = ()=>{
    return {
      onPointerDown: stopReactEventPropagation,
      onPointerMove: stopReactEventPropagation,
      onPointerUp: stopReactEventPropagation,
      onPointerCancel: stopReactEventPropagation,
      onClick: stopReactEventPropagation,
      onWheel: stopReactEventPropagation,
    } as const
  }
  
  
  // React.memo wrapper
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



