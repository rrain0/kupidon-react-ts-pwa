import { ValidationCore } from './ValidationCore'
import FormFailures = ValidationCore.FormFailures
import Values = ValidationCore.Values
import { Utils } from 'src/utils/Utils'


export namespace ValidationActions {
  import ObjectEntries = Utils.ObjectEntries
  import ObjectValues = Utils.ObjectValues
  import Failure = ValidationCore.Failure0
  
  
  
  export const updateFailures = <Vs extends Values>(
    formFailures: FormFailures<Vs>,
    objects: { fields?: (keyof Vs)[], failuresId?: string[], fullCode?: string[] },
    update?: { highlight?: boolean, notify?: boolean },
    options?: { applyToSameFullCode: boolean, remove: boolean }
  )=>{
    let filteredFails = ObjectValues(formFailures.failures).filter(failure=>
      failure && (
        objects.fields?.includes(failure.fieldName as any)
        || objects.failuresId?.includes(failure?.id as any)
        || objects.fullCode?.includes(failure.fullCode)
      )
    ) as Failure[]
    
    if (options?.applyToSameFullCode){
      const ids = new Set(filteredFails.map(f=>f.id))
      const fullCodes = new Set(filteredFails.map(f=>f.fullCode))
      filteredFails = [
        ...filteredFails,
        ...ObjectValues(formFailures.failures).filter(failure=>
          failure && !ids.has(failure.id) && fullCodes.has(failure.fullCode)
        ) as Failure[]
      ]
    }
    
    let newFormFailures = formFailures
    if (filteredFails.length>0){
      newFormFailures = Utils.clone(
        formFailures, { failures: Utils.clone(formFailures.failures) }
      )
    }
    
    if (options?.remove){
      filteredFails.forEach(f=>{
        newFormFailures.failures[f.fieldName] = undefined
      })
    } else if (update){
      filteredFails.forEach(f=>{
        newFormFailures.failures[f.fieldName] = Utils.clone(f, update)
      })
    }
    
    return newFormFailures
  }
  
  
  
}