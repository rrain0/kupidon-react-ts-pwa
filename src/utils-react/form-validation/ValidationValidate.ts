import { ArrayUtils } from 'src/utils/ArrayUtils'
import { ObjectUtils } from 'src/utils/ObjectUtils'
import { ValidationCore } from 'src/utils-react/form-validation/ValidationCore'



export namespace ValidationValidate {
  import Values = ValidationCore.Values
  import Validators = ValidationCore.Validators
  import Failure = ValidationCore.Failure
  import Failures = ValidationCore.Failures
  import outer = ValidationCore.outer
  import Field = ValidationCore.Field
  import FailureData = ValidationCore.FailureData
  import ObjectKeys = ObjectUtils.ObjectKeys
  
  
  
  export const validate = <
    Vs extends Values,
    Outer extends unknown = unknown
  >(data:{
    values: Vs, prevValues?: Partial<Vs>|undefined,
    outerValue?: Outer|undefined,
    prevFailures?: Failures<Vs>|undefined,
    validators: Validators<Vs>,
  },
    
    config?: {
      //formId?: string
      //mode?: 'all-errors' | 'form-first-error'
      //type?: ValidationType
      //checkOnly?: undefined | (keyof Vs)[]
    },
  ): Failures<Vs> => {
    
    console.log('validate: values',data.values)
    
    const values = data.values
    const valuesWithOuter = { ...values, [outer]: data.outerValue }
    const prevValues: Partial<Vs> = data.prevValues ?? {}
    const prevFailures = data.prevFailures ?? []
    const validators = data.validators
    
    config = { ...config }
    //config.mode ??= 'all-errors'
    //config.type ??= 'auto'
    
    const fields = ObjectKeys<Vs>(values)
    const fieldsWithOuter = [...fields, outer] as Field<Vs>[]
    
    const changedFields = new Set(fieldsWithOuter.filter(f=>
      f===outer && data.outerValue!==undefined
      || f !in prevValues || values[f as keyof Vs]!==prevValues[f as keyof Vs]
    ))
    const newFails: Failures<Vs> = prevFailures.filter(f=>f.usedFields.every(f=>!changedFields.has(f)))
    const fieldsWithFailures = new Set(newFails.flatMap(f=>f.fields))
    
    
    validators.forEach(([usedFields,vd])=>{
      if (
        usedFields.some(f=>changedFields.has(f))
        && usedFields.every(f=>!fieldsWithFailures.has(f))
      ){
        const type = usedFields.includes(outer) ? 'outer' : 'format'
        const usedValues = usedFields.map(f=>{
          if (type==='outer' && f!==outer) return undefined
          return valuesWithOuter[f]
        })
        let result = vd(usedValues)
        if (result instanceof FailureData){
          
          result.data.type ??= type
          result.data.fields ??= usedFields.filter(f=>f!==outer)
          result.data.usedFields ??= [...usedFields]
          result.data.usedValues ??= [...usedValues]
          
          const prevFail = prevFailures.find(
            // @ts-ignore
            f=>f.fullCode===result.fullCode
          )
          if (prevFail) {
            // todo если нажать submit, то пустые поля подсветятся,
            //  но при любом изменении любого поля вся подсветка исчезает
            //  Всё таки придётся как-то приоритезировать типы валидации: 'change'|'delayed'|'submit'
            if (prevFail.type==='format'){
              // наследуются только false из предыдущих ошибок
              result.data.highlight = prevFail.highlight && result.data.highlight
              result.data.notify = prevFail.notify && result.data.notify
            }
            // todo ???
            if (ArrayUtils.eq(prevFail.usedValues,result.data.usedValues)){
              result.data.created = prevFail.created
              result.data.delay = prevFail.delay
            }
          }
          
          const newFail = Failure.ofData(result)
          newFails.push(newFail)
          newFail.usedFields.forEach(f=>fieldsWithFailures.add(f))
        }
      }
    })
    
    console.log('validate: newFails',newFails)
    return newFails
  }
  
  
}
