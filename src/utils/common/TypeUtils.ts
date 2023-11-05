




export namespace TypeUtils {
  
  export type empty = null|undefined
  export type anyval = {}|null|undefined
  export type falseable = false | undefined | null | '' | 0
  
  
  export type Setter<T> = (value: T)=>void
  export type Updater<T> = (updater: (prevValue: T)=>T)=>void
  export type SetterOrUpdater<T> = (updater: T | ((prevValue: T)=>T))=>void
  
}