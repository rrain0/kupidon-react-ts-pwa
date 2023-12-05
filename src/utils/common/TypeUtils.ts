




export namespace TypeUtils {
  
  export type empty = null|undefined
  export type anyval = {}|null|undefined
  export type falsish = false | undefined | null | '' | 0
  
  
  export type Setter<T> = (value: T)=>void
  export type Updater<T> = (updater: (prevValue: T)=>T)=>void
  export type SetterOrUpdater<T> = (updater: T | ((prevValue: T)=>T))=>void
  export type ValueOrGenerator<T> = T | (()=>T)
  
  export type Callback = ()=>void
  
  export type PartialUndef<O extends object> =
    { [Prop in keyof O]+?: O[Prop] | undefined }
  
}