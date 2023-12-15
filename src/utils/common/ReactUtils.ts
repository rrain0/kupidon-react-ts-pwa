import React, { CSSProperties } from 'react'


export namespace ReactUtils {
  
  // React.memo wrapper
  export const Mem = <C>(Component: C): C => {
    // @ts-ignore
    return React.memo(Component)
  }
  
  export type CssProps = {
    className?: string | undefined
    style?: CSSProperties | undefined
  }
  
  
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



