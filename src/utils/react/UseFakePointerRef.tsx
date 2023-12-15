import React, { useEffect, useRef } from 'react'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { MathUtils } from 'src/utils/common/MathUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef
import fitRange = MathUtils.fitRange
import arrIndices = ArrayUtils.arrIndices



export type UseFakePointerRefRenderProps = {
  ref: React.RefObject<Element>
}
export type UseFakePointerRefProps = PartialUndef<{
  cnt: number
  render: (props: UseFakePointerRefRenderProps)=>React.ReactNode
}>
const UseFakePointerRef =
React.memo(
(props: UseFakePointerRefProps)=>{
  
  const cnt = fitRange(1, props.cnt ?? 1, Number.MAX_SAFE_INTEGER)
  const refs = useRef<Array<Element | null>>(arrIndices(cnt).map(i=>null))
  
  const elemRef = useRef<Element>(null)
  useEffect(
    ()=>{
      const elem = elemRef.current
      if (elem){
        const onPointerDown = ()=>{}
        elem.addEventListener('pointerdown',onPointerDown)
        return ()=>{
          elem.removeEventListener('pointerdown',onPointerDown)
        }
      }
    },
    [elemRef.current]
  )
  return props.render?.({ ref: elemRef })
})
export default UseFakePointerRef