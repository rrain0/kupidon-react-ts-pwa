import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import React, {
  DetailedReactHTMLElement,
  JSX,
  ReactElement,
  ReactHTMLElement,
  useCallback,
  useEffect, useLayoutEffect, useMemo,
  useState,
} from 'react'
import Input from 'src/views/Inputs/Input'
import { ValidationValidate } from 'src/utils/form-validation/ValidationValidate'
import { ValidationActions } from 'src/utils/form-validation/ValidationActions'
import validate = ValidationValidate.validate
import Failures = ValidationCore.Failures
import updateFailures = ValidationActions.updateFailures



export namespace ValidationComponents {
  
  
  export type InputValidationWrapProps<Vs extends object> = {
    fieldName: keyof Vs
    values: readonly [Vs,Vs]
    failures: Failures<Vs>
    errorPropName: string
    setError: (error: Failures<Vs>)=>void
    setValues: (values: [Vs,Vs])=>void
    //children: ReactHTMLElement</*React.InputHTMLAttributes<HTMLInputElement>,*/ HTMLInputElement>
    children: ReactElement<
      React.InputHTMLAttributes<string>,
      JSX.ElementType /*React.JSXElementConstructor<JSX.IntrinsicElements['input']>*/
    >
  }
  export const InputValidationWrap = <Vs extends object>(props: InputValidationWrapProps<Vs>) => {
    const {
      fieldName,
      values,
      failures,
      errorPropName,
      setError,
      setValues,
      children: PassedInput,
    } = props
    
    const value = values[0][fieldName] as any
    const failure = useMemo(
      ()=>failures?.find(f=>f.errorFields.includes(fieldName)),
      [failures, fieldName]
    )
    const [highlight, setHighlight] = useState(false)
    useEffect(()=>{
      setHighlight(false)
      let stale = false
      if (failure){
        const usedValue = failure.usedValues[failure.usedFields.findIndex(f=>f===fieldName)]
        if (failure.highlight && usedValue===value){
          if (!failure.isDelayed) setHighlight(true)
          else failure.awaitDelay.then(()=>{
            !stale && setHighlight(true)
          })
        }
      }
      return ()=>{stale=true}
    },[failure, fieldName, value])
    
    
    const Input = React.cloneElement(PassedInput, {
      value: value,
      [errorPropName]: highlight,
      onChange: ev=>{
        //console.log('ValidationWrap onChange')
        const newValues = { ...values[0], [fieldName]: ev.target.value as any }
        setValues([newValues,values[0]])
        PassedInput.props.onChange?.(ev)
      },
      onBlur: ev=>{
        if (failures.some(f=>f.errorFields.includes(fieldName) && f.isDelayed)){
          const newFails = updateFailures(
            failures,
            { errorFields: [fieldName] },
            { delay: 0 }
          )
          setError(newFails)
        }
        PassedInput.props.onBlur?.(ev)
      }
    })
    
    //console.log('render ValidationWrap')
    
    return <>{Input}</>
  }
  
  
  
  
  export const RadioInputValidationWrap = <Vs extends object>(props: InputValidationWrapProps<Vs>) => {
    const {
      fieldName,
      values,
      failures,
      errorPropName,
      setError,
      setValues,
      children: PassedInput,
    } = props
    
    const value = values[0][fieldName] as any
    const failure = useMemo(
      ()=>failures?.find(f=>f.errorFields.includes(fieldName)),
      [failures, fieldName]
    )
    const [highlight, setHighlight] = useState(false)
    useEffect(()=>{
      setHighlight(false)
      let stale = false
      if (failure){
        const usedValue = failure.usedValues[failure.usedFields.findIndex(f=>f===fieldName)]
        if (failure.highlight && usedValue===value){
          if (!failure.isDelayed) setHighlight(true)
          else failure.awaitDelay.then(()=>{
            !stale && setHighlight(true)
          })
        }
      }
      return ()=>{stale=true}
    },[failure, fieldName, value])
    
    
    const Input = React.cloneElement(PassedInput, {
      checked: value===PassedInput.props.value,
      [errorPropName]: highlight,
      onChange: ev=>{
        //console.log('ValidationWrap onChange')
        const newValues = { ...values[0], [fieldName]: ev.target.value as any }
        setValues([newValues,values[0]])
        PassedInput.props.onChange?.(ev)
      },
      onBlur: ev=>{
        if (failures.some(f=>f.errorFields.includes(fieldName) && f.isDelayed)){
          const newFails = updateFailures(
            failures,
            { errorFields: [fieldName] },
            { delay: 0 }
          )
          setError(newFails)
        }
        PassedInput.props.onBlur?.(ev)
      }
    })
    
    //console.log('render ValidationWrap')
    
    return <>{Input}</>
  }
  
  
}





{
  const f = ()=>{
    type InputType = ReactElement<
      React.InputHTMLAttributes<string>,
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