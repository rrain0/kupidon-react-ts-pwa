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
import { useDebounce } from 'src/utils-react/useDebounce'


export namespace ValidationComponents {
  import Values = ValidationCore.Values
  import validate = ValidationValidate.validate
  import Validators = ValidationCore.Validators
  import Failures = ValidationCore.Failures
  import updateFailures = ValidationActions.updateFailures;
  
  
  export type InputValidationWrapProps<Vs extends Values> = {
    fieldName: keyof Vs
    values: readonly [Vs,Vs]
    validators: Validators<Vs>
    failures: readonly [Failures<Vs>,Failures<Vs>]
    errorPropName: string
    setError: (error: [Failures<Vs>,Failures<Vs>])=>void
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
    
    
    
    
    /*const [debounceUpdate, setDebounceUpdate] = useState(false)
    useDebounce(()=>{
      setDebounceUpdate(true)
    },3000,[values[fieldName]])
    useEffect(()=>{
      if (debounceUpdate){
        const newFailures = validate(values, failures, validators, { checkOnly: [fieldName] })
        setError(newFailures)
        setDebounceUpdate(false)
      }
    },[debounceUpdate, values, failures])*/
    
    
    
    const PassedInput = children
    //console.log('type', PassedInput.type)
    
    const Input = React.cloneElement(PassedInput, {
      value: values[0][fieldName] as string,
      [errorPropName]: failures[0]?.find(f=>f.fields.includes(fieldName))?.highlightNow,
      onChange: ev=>{
        //console.log('ValidationWrap onChange')
        const newValues = { ...values[0], [fieldName]: ev.target.value as any }
        let newFailures = validate({
          values: newValues, prevValues: values[0],
          prevFailures: failures[0],
          validators
        })
        setValues([newValues,values[0]])
        setError([newFailures,failures[0]])
        PassedInput.props.onChange?.(ev)
      },
      onBlur: ev=>{
        //console.log('ValidationWrap onBlur')
        //setDebounceUpdate(false)
        const newFails = updateFailures(
          failures[0],
          { fields: [fieldName] },
          { delay: 0 }
        )
        setError([newFails, failures[0]])
        PassedInput.props.onBlur?.(ev)
      },
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
