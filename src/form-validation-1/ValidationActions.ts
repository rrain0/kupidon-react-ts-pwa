import { ValidationCore } from './ValidationCore'
import Values = ValidationCore.Values
import { Utils } from 'src/utils/Utils'


export namespace ValidationActions {
  import Failures = ValidationCore.Failures
  import Field = ValidationCore.Field
  import ObjectEntries = Utils.ObjectEntries
  
  export const updateFailures = <Vs extends Values>(
    failures: Failures<Vs>,
    objects: {
      failureIds?: string[] | 'all',
      fullCodes?: string[],
      fields?: Field<Vs>[],
    },
    update?: {
      highlight?: boolean,
      notify?: boolean,
      delay?: number,
    }
  ): Failures<Vs> => {
    let changed = 0
    const newFails = failures.map(fail=>{
      if (
          (
            objects.failureIds==='all'
            || objects.failureIds?.some(id=>id===fail.id)
            || objects.fullCodes?.some(fc=>fc===fail.fullCode)
            || objects.fields?.some(f=>fail.fields.includes(f))
          )
          && ObjectEntries(update).some(([prop,val]) => fail[prop]!==val)
      ) {
        changed++
        return Utils.copy(fail, update)
      }
      return fail
    })
    
    failures = changed ? newFails : failures
    //console.log('updated failures:', changed, failures)
    
    return failures
  }
  
  
  
}