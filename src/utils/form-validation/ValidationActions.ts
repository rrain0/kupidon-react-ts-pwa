import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import Failures = ValidationCore.Failures
import ObjectEntries = ObjectUtils.ObjectEntries



export namespace ValidationActions {
  
  
  
  export const updateFailures = <Vs extends object>(
    failures: Failures<Vs>,
    objects: {
      failures?: Failures<Vs>,
      failureIds?: string[] | 'all',
      errorFields?: (keyof Vs)[], // todo process symbols
    },
    update?: {
      highlight?: boolean,
      notify?: boolean,
      delay?: number,
    }
  ): Failures<Vs> => {
    //console.log('failureIds',objects.failureIds)
    //console.log('update',update)
    let changed = 0
    const newFails = failures.map(fail=>{
      if (
          (
            failures?.some(f=>f===fail)
            || objects.failureIds==='all'
            || objects.failureIds?.some(id=>id===fail.id)
            || objects.errorFields?.some(f=>fail.errorFields.includes(f))
          )
          && ObjectEntries(update).some(([prop,val]) => fail[prop]!==val)
      ) {
        changed++
        return fail.copy(update)
      }
      return fail
    })
    
    failures = changed ? newFails : failures
    //console.log('updated failures:', changed, failures)
    
    return failures
  }
  
  
  
}