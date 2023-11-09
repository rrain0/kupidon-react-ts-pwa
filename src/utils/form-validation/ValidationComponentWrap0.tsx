import { CastUtils } from 'src/utils/common/CastUtils'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import React, {
  JSX,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import Input from 'src/views/Inputs/Input/Input'
import { ValidationActions } from 'src/utils/form-validation/ValidationActions'
import Failures = ValidationCore.Failures
import updateFailures = ValidationActions.updateFailures
import awaitDelay = ValidationActions.awaitDelay
import ReactMemoTyped = ReactUtils.Mem
import trueOrUndef = CastUtils.trueOrUndef
import Values = ValidationCore.Values
import Setter = TypeUtils.Setter




export type ValidationComponentWrapRenderProps
<
  Vs extends Values,
  F extends keyof Vs,
> = {
  value: Vs[F]
  highlight: true | undefined
  setValue: Setter<Vs[F]>
  onBlur: ()=>void
  inputProps: {
    value: Vs[F]
    onChange: (ev: React.ChangeEvent<HTMLInputElement>)=>void
    onBlur: ()=>void
  }
}
  
export type ValidationComponentWrapProps
<
  Vs extends Values,
  F extends keyof Vs,
> = {
  values: readonly [Vs,Vs]
  fieldName: F
  failures: Failures<Vs>
  setError: (error: Failures<Vs>)=>void
  setValues: (values: [Vs,Vs])=>void
  render: (props: ValidationComponentWrapRenderProps<Vs,F>)=>React.ReactNode
}
const ValidationComponentWrap =
<
  Vs extends Values,
  F extends keyof Vs,
>
(props: ValidationComponentWrapProps<Vs,F>) => {
  const {
    fieldName,
    values,
    failures,
    setError,
    setValues,
    render,
  } = props
  
  
  const value = values[0][fieldName]
  
  
  const [highlight, setHighlight] = useState(false)
  useEffect(()=>{
    setHighlight(false)
    const stale = [false] as [boolean]
    
    const fs = failures
      .filter(f=>f.errorFields.includes(fieldName))
      .filter(f=>f.usedValues[f.usedFields.findIndex(f=>f===fieldName)]===value && f.highlight)
    awaitDelay(fs, stale, ()=>setHighlight(true))
    
    return ()=>{ stale[0]=true }
  },[failures, fieldName, value])
  
  
  const setValueEffectEvent = useEffectEvent((value: Vs[F])=>{
    const newValues = { ...values[0], [fieldName]: value }
    setValues([newValues,values[0]])
  })
  const setValue = useCallback(
    (value: Vs[F])=>setValueEffectEvent(value),
    []
  )
  
  
  const onBlurEffectEvent = useEffectEvent(()=>{
    const failsToUpdate = failures.filter(f=>
      f.errorFields.includes(fieldName)
      && f.highlight
      && f.isDelayed
    )
    if (failsToUpdate.length) setError(updateFailures(
      failures,
      { failures: failsToUpdate },
      { delay: 0 },
    ))
  })
  const onBlur = useCallback(
    ()=>onBlurEffectEvent(),
    []
  )
  
  
  
  const inputProps = {
    value: value,
    onChange: useCallback(
      (ev: React.ChangeEvent<HTMLInputElement>)=>{
        setValue(ev.currentTarget.value as any)
      },
      []
    ),
    onBlur: onBlur
  }
  
  
  return render({
    value: value,
    highlight: trueOrUndef(highlight),
    setValue: setValue,
    onBlur: onBlur,
    inputProps: inputProps,
  })
}
export default ReactMemoTyped(ValidationComponentWrap)













{
  const inputTypeTest = ()=>{
    type InputType = ReactElement<
      React.InputHTMLAttributes<Element>,
      JSX.ElementType
      /*React.JSXElementConstructor<JSX.IntrinsicElements['input']>*/
    >
    let i1: InputType = <input value={'ldksfjl'}/>
    let i2: InputType = <Input value={'ldksfjl'}/>
    
    i1 = React.cloneElement(i1, { name: 'some-name' })
    i2 = React.cloneElement(i2, { name: 'some-name' })
    
    i1 = React.cloneElement(i2, { name: 'some-name' })
    i2 = React.cloneElement(i1, { name: 'some-name' })
  }
}