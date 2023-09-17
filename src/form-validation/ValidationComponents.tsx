import { ValidationCore } from './ValidationCore'
import React, {
  DetailedReactHTMLElement,
  JSX,
  ReactElement,
  ReactHTMLElement,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Input from 'src/components/Inputs/Input'
import { ValidationValidate } from './ValidationValidate'
import { ValidationActions } from './ValidationActions'
import { TypeUtils } from 'src/utils/TypeUtils'


export namespace ValidationComponents {
  import Values = ValidationCore.Values
  import validate = ValidationValidate.validate
  import Validators = ValidationCore.Validators
  import Failures = ValidationCore.Failures
  import updateFailures = ValidationActions.updateFailures
  import empty = TypeUtils.empty
  
  
  export type InputValidationWrapProps<Vs extends Values> = {
    fieldName: keyof Vs
    values: readonly [Vs,Vs]
    validators: Validators<Vs>
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
  export const InputValidationWrap = <Vs extends Values>(props: InputValidationWrapProps<Vs>) => {
    let {
      fieldName,
      values,
      validators,
      failures,
      errorPropName,
      setError,
      setValues,
      children,
    } = props
    
    
    const PassedInput = children
    
    const Input = React.cloneElement(PassedInput, {
      value: values[0][fieldName] as string,
      [errorPropName]: failures?.find(f=>f.fields.includes(fieldName))?.highlightNow,
      onChange: ev=>{
        //console.log('ValidationWrap onChange')
        const newValues = { ...values[0], [fieldName]: ev.target.value as any }
        let newFailures = validate({
          values: newValues, prevValues: values[0],
          prevFailures: failures,
          validators
        })
        setValues([newValues,values[0]])
        setError(newFailures)
        PassedInput.props.onChange?.(ev)
      },
      onBlur: ev=>{
        //console.log('ValidationWrap onBlur')
        //setDebounceUpdate(false)
        const newFails = updateFailures(
          failures,
          { fields: [fieldName] },
          { delay: 0 }
        )
        setError(newFails)
        PassedInput.props.onBlur?.(ev)
      }
    })
    
    //console.log('render ValidationWrap')
    
    return <>{Input}</>
  }
  
  
  
  
  export const RadioInputValidationWrap = <Vs extends Values>(props: InputValidationWrapProps<Vs>) => {
    let {
      fieldName,
      values,
      validators,
      failures,
      errorPropName,
      setError,
      setValues,
      children,
    } = props
    
    
    const PassedInput = children
    
    const Input = React.cloneElement(PassedInput, {
      checked: values[0][fieldName]===PassedInput.props.value,
      [errorPropName]: failures?.find(f=>f.fields.includes(fieldName))?.highlightNow,
      onChange: ev=>{
        //console.log('ValidationWrap onChange')
        const newValues = { ...values[0], [fieldName]: ev.target.value as any }
        let newFailures = validate({
          values: newValues, prevValues: values[0],
          prevFailures: failures,
          validators
        })
        setValues([newValues,values[0]])
        setError(newFailures)
        PassedInput.props.onChange?.(ev)
      },
      onBlur: ev=>{
        //console.log('ValidationWrap onBlur')
        //setDebounceUpdate(false)
        const newFails = updateFailures(
          failures,
          { fields: [fieldName] },
          { delay: 0 }
        )
        setError(newFails)
        PassedInput.props.onBlur?.(ev)
      }
    })
    
    //console.log('render ValidationWrap')
    
    return <>{Input}</>
  }
  
  
}






function f(){
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
