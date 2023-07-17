import { ValidationCore } from './ValidationCore'
import ElementFailures = ValidationCore.ElementFailure
import FormFailures = ValidationCore.FormFailures
import Values = ValidationCore.Values
import { Utils } from 'src/utils/Utils';


export namespace ValidationActions {
  import ObjectEntries = Utils.ObjectEntries;
  import ObjectValues = Utils.ObjectValues;
  
  
  
  // сначала проверить не выполнено ли уже действие, а потом пересоздать все объекты
  export const removeFailures = <Vs extends Values>(
    formFailures: FormFailures<Vs>|undefined, field?: keyof Vs | undefined
  )=>{
    if(!formFailures) return undefined
    if (field===undefined){
      if (ObjectValues(formFailures.failures).length===0) return formFailures
      const old = formFailures.failures
      const now = { ...old }
      Object.keys(old).forEach(key=>now[key] = new ElementFailures(old[key].id, old[key].value))
      return new FormFailures(formFailures.id, now)
    }
    const old = formFailures.failures[field]
    if (!old) return formFailures
    const newFailures = { ...formFailures.failures, [field]: undefined }
    return new FormFailures(formFailures.id, newFailures)
  }
  
  
  export const hideHighlight = <Vs extends Values>(
    formFailures: FormFailures<Vs>, field: keyof Vs
  )=>{
    const old = formFailures.failures[field]
    if (!old) return formFailures
    const now = Utils.clone(old, //@ts-ignore
      { highlight: false })
    const newErrors = { ...formFailures.failures, [field]: now }
    return new FormFailures(formFailures.id, newErrors)
  }
  
  
  export const hideNotification = <Vs extends Values>(
    formFailures: FormFailures<Vs>, field: keyof Vs
  )=>{
    const old = formFailures.failures[field]
    if (!old) return formFailures
    const now = Utils.clone(old, //@ts-ignore
      { notify: false })
    const newErrors = { ...formFailures.failures, [field]: now }
    return new FormFailures(formFailures.id, newErrors)
  }
  
  export const changeFailure = <Vs extends Values>(
    formFailures: FormFailures<Vs>,
    field: keyof Vs,
    update: {
      highlight?: boolean
      notify?: boolean
    }
  )=>{
    const old = formFailures.failures[field]
    if (!old) return formFailures
    const now = Utils.clone(old, //@ts-ignore
      update)
    const newErrors = { ...formFailures.failures, [field]: now }
    return new FormFailures(formFailures.id, newErrors)
  }
  
  
  export const hideNotification2 = (formFailures: FormFailures<any>, failureId: string) => {
    const failures = ObjectEntries(formFailures.failures)
      .filter(([fieldName,failure])=>failure?.id===failureId)
    let newFormFailures = formFailures
    failures.forEach(([fieldName,failure])=>{
      if (newFormFailures===formFailures) newFormFailures = Utils.clone(
        formFailures, { failures: Utils.clone(formFailures.failures) }
      )
      //@ts-ignore
      newFormFailures.failures[fieldName] = Utils.clone(
        //@ts-ignore
        newFormFailures.failures[fieldName],
        { notify: false }
      )
    })
    return newFormFailures
  }
  
}