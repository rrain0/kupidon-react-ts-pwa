import { ValidationCore } from './ValidationCore'
import FormFailures = ValidationCore.FormFailures
import Values = ValidationCore.Values
import { Utils } from 'src/utils/Utils'


export namespace ValidationActions {
  import ObjectEntries = Utils.ObjectEntries
  
  
  
  export const updateFailures = <Vs extends Values>(
    formFailures: FormFailures<Vs>,
    objects: { fields?: (keyof Vs)[], failuresId?: string[] },
    update: { highlight?: boolean, notify?: boolean }
  )=>{
    const filteredFails = ObjectEntries(formFailures.failures)
      .filter(([fieldName,failure])=>
        failure && (
          objects.fields?.includes(fieldName)
          || objects.failuresId?.includes(failure?.id as any)
        )
      )
    let newFormFailures = formFailures
    filteredFails.forEach(([fieldName,failure])=>{
      if (newFormFailures===formFailures) newFormFailures = Utils.clone(
        formFailures, { failures: Utils.clone(formFailures.failures) }
      ) //@ts-ignore
      newFormFailures.failures[fieldName] = Utils.clone(failure, update)
    })
    return newFormFailures
  }
  
  
  
}