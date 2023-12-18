import React, { useEffect, useRef } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef




export type UseFakePointerRefRenderProps = {
  ref: React.RefObject<Element>
  ref2: React.RefObject<Element>
  ref3: React.RefObject<Element>
  ref4: React.RefObject<Element>
}
export type UseFakePointerRefProps = PartialUndef<{
  render: (props: UseFakePointerRefRenderProps)=>React.ReactNode
}>
const UseFakePointerRef =
(props: UseFakePointerRefProps)=>{
  
  const elemRef1 = useRef<Element>(null)
  const elemRef2 = useRef<Element>(null)
  const elemRef3 = useRef<Element>(null)
  const elemRef4 = useRef<Element>(null)
  
  useEffect(
    ()=>{
      const elements =
        [elemRef1.current, elemRef2.current, elemRef3.current, elemRef4.current]
        .filter(it=>it) as Element[]
      
      if (elements.length){
        const onPointerDown = ()=>{
          //console.log('onPointerDown check')
        }
        elements.forEach(it=>it.addEventListener('pointerdown',onPointerDown))
        return ()=>{
          elements.forEach(it=>it.removeEventListener('pointerdown',onPointerDown))
        }
      }
    },
    [elemRef1.current, elemRef2.current, elemRef3.current, elemRef4.current]
  )
  return props.render?.({
    ref: elemRef1,
    ref2: elemRef2,
    ref3: elemRef3,
    ref4: elemRef4,
  })
}
export default UseFakePointerRef



