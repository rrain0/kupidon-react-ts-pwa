




export namespace TypeUtils {
  
  export type empty = null|undefined
  export type anyval = {}|null|undefined
  export type falsy = false | undefined | null | '' | 0
  
  export type Exists<T> = Exclude<T, null|undefined>
  
  
  export type Setter<T> = (value: T)=>void
  export type Updater<T> = (updater: (prevValue: T)=>T)=>void
  export type SetterOrUpdater<T> = (updater: T | ((prevValue: T)=>T))=>void
  export type ValueOrUpdater<T> = T | ((prevValue: T)=>T)
  export type ValueOrGenerator<T> = T | (()=>T)
  
  export type Callback = ()=>void
  export type CallbackParam<T> = (value: T)=>void
  
  export type PartialUndef<O extends object> =
    { [Prop in keyof O]+?: O[Prop] | undefined }
  
  
  
  
  
  
  export const trueOrUndef = (value: any): true|undefined => value ? true : undefined
  export const falsyToUndef = <T>(value: T) => value ? value : undefined
  export function exists<T extends {}|null|undefined>(value: T): value is T & {} {
    return value!==null && value!==undefined
  }
  
}