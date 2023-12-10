import React, { useEffect, useRef } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef



export type UseFakePointerRefRenderProps = {
  ref: React.RefObject<HTMLElement>
}
export type UseFakePointerRefProps = PartialUndef<{
  render: (props: UseFakePointerRefRenderProps)=>React.ReactNode
}>
const UseFakePointerRef =
React.memo(
(props: UseFakePointerRefProps)=>{
  const elemRef = useRef<HTMLElement>(null)
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