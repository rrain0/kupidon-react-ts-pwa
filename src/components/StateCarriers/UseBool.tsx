import { useCallback, useState } from 'react'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Mem = ReactUtils.Mem
import SetterOrUpdater = TypeUtils.SetterOrUpdater



export type UseBoolRenderProps = {
  value: boolean
  setValue: SetterOrUpdater<boolean>
  setTrue: ()=>void
  setFalse: ()=>void
}
export type UseBoolProps = {
  initial?: boolean | undefined
  render?: ((props: UseBoolRenderProps)=>React.ReactNode) | undefined
}
const UseBool = (props: UseBoolProps)=>{
  const {
    initial = false,
  } = props
  
  const [value, setValue] = useState(initial)
  const setTrue = useCallback(
    ()=>setValue(true),
    []
  )
  const setFalse = useCallback(
    ()=>setValue(true),
    []
  )
  
  return props.render?.({ value, setValue, setTrue, setFalse })
}
export default Mem(UseBool)