import { empty } from 'src/utils/common/TypeUtils'
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
import Input from 'src/views/Inputs/Input/Input'
import { ValidationActions } from 'src/utils/form-validation/ValidationActions'
import { RadioInputGroupProps } from 'src/views/Inputs/RadioInput/RadioInputGroup'
import Failures = ValidationCore.Failures
import updateFailures = ValidationActions.updateFailures
import awaitDelay = ValidationActions.awaitDelay



export namespace ValidationComponents {
  
  
  
  export type InputValidationWrapProps
    <
      Vs extends object,
      I extends React.InputHTMLAttributes<Element>,
    > = {
    fieldName: keyof Vs
    values: readonly [Vs,Vs]
    failures: Failures<Vs>
    errorPropName: keyof I
    setError: (error: Failures<Vs>)=>void
    setValues: (values: [Vs,Vs])=>void
    //children: ReactHTMLElement</*React.InputHTMLAttributes<HTMLInputElement>,*/ HTMLInputElement>
    children: ReactElement<
      I,
      JSX.ElementType /*React.JSXElementConstructor<JSX.IntrinsicElements['input']>*/
    >
  }
  export const InputValidationWrap =
    <
      Vs extends object,
      I extends React.InputHTMLAttributes<Element>,
    >
    (props: InputValidationWrapProps<Vs,I>) => {
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
    const [highlight, setHighlight] = useState(false)
    useEffect(()=>{
      setHighlight(false)
      const stale = [false] as [boolean]
      
      const fs = failures
        .filter(f=>f.highlightFields.includes(fieldName))
        .filter(f=>f.usedValues[f.usedFields.findIndex(f=>f===fieldName)]===value && f.highlight)
      awaitDelay(fs, stale, ()=>setHighlight(true))
      
      return ()=>{ stale[0]=true }
    },[failures, fieldName, value])
    
    
    
    const Input =
      React.cloneElement<React.InputHTMLAttributes<Element> & { [Prop in typeof errorPropName]?: any }>(
        PassedInput,
        {
          value: value as string,
          [errorPropName]: highlight,
          onChange: ev=>{
            //console.log('ValidationWrap onChange')
            const newValues = { ...values[0], [fieldName]: ev.target.value as any }
            setValues([newValues,values[0]])
            PassedInput.props.onChange?.(ev)
          },
          onBlur: ev=>{
            if (failures.some(f=>f.highlightFields.includes(fieldName) && f.isDelayed)){
              const newFails = updateFailures(
                failures,
                { highlightFields: [fieldName] },
                { delay: 0 }
              )
              setError(newFails)
            }
            PassedInput.props.onBlur?.(ev)
          }
        }
      )
    
    return <>{Input}</>
  }
  
  
  
  
  export const RadioInputValidationWrap =
    <
      Vs extends object,
      I extends React.InputHTMLAttributes<Element>,
    >
    (props: InputValidationWrapProps<Vs,I>) => {
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
    const [highlight, setHighlight] = useState(false)
    useEffect(()=>{
      setHighlight(false)
      const stale = [false] as [boolean]
      
      const fs = failures
        .filter(f=>f.highlightFields.includes(fieldName))
        .filter(f=>f.usedValues[f.usedFields.findIndex(f=>f===fieldName)]===value && f.highlight)
      awaitDelay(fs, stale, ()=>setHighlight(true))
      
      return ()=>{ stale[0]=true }
    },[failures, fieldName, value])
    
    
    const Input =
      React.cloneElement<React.InputHTMLAttributes<Element> & { [Prop in typeof errorPropName]?: any }>(
        PassedInput,
          {
          checked: value===PassedInput.props.value,
          [errorPropName]: highlight,
          onChange: ev=>{
            //console.log('ValidationWrap onChange')
            const newValues = { ...values[0], [fieldName]: ev.target.value as any }
            setValues([newValues,values[0]])
            PassedInput.props.onChange?.(ev)
          },
          onBlur: ev=>{
            if (failures.some(f=>f.highlightFields.includes(fieldName) && f.isDelayed)){
              const newFails = updateFailures(
                failures,
                { highlightFields: [fieldName] },
                { delay: 0 }
              )
              setError(newFails)
            }
            PassedInput.props.onBlur?.(ev)
          }
        }
      )
    
    return <>{Input}</>
  }
  
  
  
  
  export type RadioInputGroupValidationWrapProps<Vs extends object> = {
    fieldName: keyof Vs
    values: readonly [Vs,Vs]
    failures: Failures<Vs>
    errorPropName: string
    setError: (error: Failures<Vs>)=>void
    setValues: (values: [Vs,Vs])=>void
    //children: ReactHTMLElement</*React.InputHTMLAttributes<HTMLInputElement>,*/ HTMLInputElement>
    children: ReactElement<
      RadioInputGroupProps,
      JSX.ElementType /*React.JSXElementConstructor<JSX.IntrinsicElements['input']>*/
    >
  }
  export const RadioInputGroupValidationWrap = <Vs extends object>(props: RadioInputGroupValidationWrapProps<Vs>) => {
    const {
      fieldName,
      values,
      failures,
      errorPropName,
      setError,
      setValues,
      children: PassedDiv,
    } = props
    
    
    const value = values[0][fieldName] as any
    const [highlight, setHighlight] = useState(false)
    useEffect(()=>{
      setHighlight(false)
      const stale = [false] as [boolean]
      
      const fs = failures
        .filter(f=>f.highlightFields.includes(fieldName))
        .filter(f=>f.usedValues[f.usedFields.findIndex(f=>f===fieldName)]===value && f.highlight)
      awaitDelay(fs, stale, ()=>setHighlight(true))
      
      return ()=>{ stale[0]=true }
    },[failures, fieldName, value])
    
    
    
    
    const Div = React.cloneElement(PassedDiv, {
      [errorPropName]: highlight,
    })
    
    
    return <>{Div}</>
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