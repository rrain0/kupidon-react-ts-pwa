import React, { useCallback, useState } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import SetterOrUpdater = TypeUtils.SetterOrUpdater



export type UseBoolRenderProps = {
  value: boolean
  notValue: boolean
  setValue: SetterOrUpdater<boolean>
  setTrue: ()=>void
  setFalse: ()=>void
}
export type UseBoolProps = {
  initial?: boolean | undefined
  render?: ((props: UseBoolRenderProps)=>React.ReactNode) | undefined
}
const UseBool =
React.memo(
(props: UseBoolProps)=>{
  const {
    initial = false,
  } = props
  
  const [value, setValue] = useState(initial)
  const setTrue = useCallback(
    ()=>setValue(true),
    []
  )
  const setFalse = useCallback(
    ()=>setValue(false),
    []
  )
  
  return props.render?.({
    value,
    notValue: !value,
    setValue,
    setTrue,
    setFalse
  })
})
export default UseBool