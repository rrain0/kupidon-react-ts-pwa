import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { ValidationCore } from 'src/utils/react/form-validation/ValidationCore'
import Values = ValidationCore.Values
import Failures = ValidationCore.Failures
import { useEffect, useState } from 'react'



export function useFailureDelay<Vs extends Values>(
  failures: Failures<Vs>,
  setFailures: (failures: Failures<Vs>)=>void
){
  
  const [resetDelay,setResetDelay] = useState(false)
  
  useEffect(()=>{
    const now = +new Date()
    let next: number|undefined
    failures.forEach(f=>{
      const time = +f.created+f.delay
      if (time>now && (!next || time<next)) next = time
    })
    if (next !== undefined){
      const timerId = setTimeout(
        ()=>setResetDelay(true),
        next-now
      )
      return ()=>clearTimeout(timerId)
    }
  },[failures])
  
  useEffect(()=>{
    if (resetDelay){
      setResetDelay(false)
      setFailures(
        failures.map(f=>{
          const now = +new Date()
          const time = +f.created+f.delay
          if (time<=now && f.delay>0) return ObjectUtils.copy(f, { delay: 0 })
          else return f
        })
      )
    }
  },[resetDelay,failures])
  
}