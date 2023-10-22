import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import Validators = ValidationCore.Validators
import Failure = ValidationCore.Failure
import Failures = ValidationCore.Failures
import ObjectKeys = ObjectUtils.ObjectKeys
import PartialFailureData = ValidationCore.PartialFailureData
import NonEmptyArr = ArrayUtils.NonEmptyArr



export namespace ValidationValidate {
  
  
  
  /*
   Если ошибка для одного из указанных полей уже есть, то вадидатор не запускается.
   
   Если функция валидации увидела изменение значения, то все валидаторы (до первой ошибки),
   использующие это значение, перезапустятся для перепроверки.
   
   Как узнать, что поле было проврено?
   Никак, программист задаёт порядок валидаторов, располагая их так,
   что, если предыдущие валидаторы для данных входных полей не выдали ошибок,
   значит поле готово для текущего валидатора.
   
   [
   [field names be used to validate],
   validator function: ([field values be used to validate])=>{}
   ]
   */
  
  export const validate = <Vs extends object>(
    data:{
      values: Vs,
      prevValues?: Partial<Vs>|undefined,
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
    
    const values = data.values
    const prevValues: Partial<Vs> = data.prevValues ?? {}
    const prevFailures = data.prevFailures ?? []
    const validators = data.validators
    
    //config = { ...config }
    //config.mode ??= 'all-errors'
    //config.type ??= 'auto'
    
    //console.log('validate: prevValues',prevValues)
    //console.log('validate: values',values)
    //console.log('validate: prevFailures',prevFailures)
    
    
    const fields = ObjectKeys<Vs>(values)
    const changedFields: Set<keyof Vs> = new Set(
      fields.filter(f=>!(f in prevValues) || values[f]!==prevValues[f])
    )
    const retainedFails: Failures<Vs> = prevFailures
      .filter(f=>f.usedFields.every(f=>!changedFields.has(f)))
    const errorFields = new Set(
      retainedFails.filter(f=>!f.canSubmit).flatMap(f=>f.errorFields)
    )
    const newFails: Failures<Vs> = []
    
    //console.log('validate: changedFields',changedFields)
    console.log('VALIDATE: RETAINED_FAILS',retainedFails)
    //console.log('validate: errorFields',errorFields)
    
    validators.forEach(([usedFields,vd])=>{
      if (
        usedFields.some(f=>changedFields.has(f))
        && usedFields.every(f=>!errorFields.has(f))
      ){
        
        const usedValues = usedFields.map(f=>values[f]) as NonEmptyArr<Vs[keyof Vs]>
        let result = vd(usedValues)
        if (result instanceof PartialFailureData){
          const newFail = new Failure({
            ...result,
            usedFields: result.usedFields ?? usedFields,
            usedValues: result.usedValues ?? usedValues,
          })
          newFails.unshift(newFail) // fresh failures first
          newFail.errorFields.forEach(f=>errorFields.add(f))
        }
      }
    })
    
    const totalFails = [...newFails,...retainedFails]
    //console.log('VALIDATE: TOTAL_FAILS',totalFails)
    
    return totalFails
  }
  
  
}
