import { ValidationCore } from './ValidationCore'
import { Utils } from 'src/utils/Utils'


export namespace ValidationValidate {
  import Values = ValidationCore.Values
  import Validators = ValidationCore.Validators
  import FormFailures = ValidationCore.FormFailures
  import Failures = ValidationCore.Failures
  import ValidationType = ValidationCore.ValidationType
  import FailureData = ValidationCore.FailureData
  import Failure2 = ValidationCore.Failure2
  import ObjectEntries = Utils.ObjectEntries;
  
  
  
  export const validate = <Vs extends Values>(
    values: Vs,
    prevFailures: FormFailures<Vs>|undefined,
    validators: Validators<Vs>,
    config?: {
      mode?: 'all-errors' |  'form-first-error'
      type?: ValidationType
      checkOnly?: undefined | string[]
    },
  ): FormFailures<Vs> => {
    
    config = { ...config }
    config.mode ??= 'all-errors'
    config.type ??= 'auto'
    
    prevFailures ??= new FormFailures('',{})
    
    const failures: Partial<Failures<Vs>> = {}
    
    // [ field-name, validator[] ][]
    const fnmsToVds = ObjectEntries(validators)
    
    fieldLoop: for (let i = 0; i < fnmsToVds.length; i++) {
      const fToVds = fnmsToVds[i] // ( [ field-name, validator[] ][] )[i] => [ field-name, validator[] ]
      const [fnm,vds] = fToVds // [ field-name, validator[] ]
      const v = values[fnm] // ( { [field-name]: value } )[field-name] => value
      
      if (config.checkOnly){
        if (!config.checkOnly.includes(fnm)){
          failures[fnm] = prevFailures.failures[fnm]
          continue fieldLoop
        }
      }
      
      // todo использовать кешированные значения чтобы снова не проверять (но тут валидаторы нескольких полей в пролёте)
      //  или отправлять в value undefined который будет говорить о том, что не перепроверять это значение
      //  Можно фиксировать через геттеры, какие поля пытался взять валидатор и проверять изменились ли они и валидатор
      //  но опять же валидатор в первой итерации может ещё не запросить все поля, потому что ошибка
      /*if (prevErrors && v===prevErrors.failures[fnm].value){ }*/
      //if (!failures[fnm]) failures[fnm] = new ElementFailures(fnm,v)
      if(vds) for (let ii = 0; ii < vds.length; ii++) {
        const vd = vds[ii]
        const result = vd({ value: v, values, failures, type: config.type})
        if ('later'===result){
          // TODO проверка на циклические зависимости
          // помещаем текущую запись в конец
          fnmsToVds[i] = fnmsToVds[fnmsToVds.length-1]
          fnmsToVds[fnmsToVds.length-1] = fToVds
          i--
          continue fieldLoop
        } else if (['ok',undefined].includes(result as any)){
          failures[fnm] = null
          continue
        } else if ('ok-stop'===result){
          failures[fnm] = null
          break
        } else if (result instanceof FailureData) {
          {
            const prev = prevFailures.failures[fnm]
            if (config.type!=='submit' && prev && prev.fullCode===result.fullCode){
              if (!prev.highlight) result.data.highlight = false
              if (!prev.notify) result.data.notify = false
            }
          }
          failures[fnm] = Failure2.of(fnm,v,result)
          if (config.mode==='form-first-error') break fieldLoop
          /*if (config.mode==='field-first-error')*/ continue fieldLoop
        }
      }
    }
    
    // todo form id
    return new FormFailures('', failures as Failures<Vs>)
  }
  
  
}