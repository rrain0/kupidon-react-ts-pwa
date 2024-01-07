




export namespace TypeUtils {
  
  export type empty = null|undefined
  export type anyval = {}|null|undefined
  export type falsy = false | undefined | null | '' | 0
  
  export type Exists<T> = Exclude<T, null|undefined>
  
  
  export type Callback = ()=>void
  export type Callback1<T> = (value: T)=>void
  export type Setter<T> = Callback1<T>
  export type Generator<T> = ()=>T
  export type Mapper<T> = (prevValue: T)=>T
  
  export type ValueOrMapper<T> = T | Mapper<T>
  export type ValueOrGenerator<T> = T | Generator<T>
  export type Updater<T> = (mapper: Mapper<T>)=>void
  export type SetterOrUpdater<T> = (valueOrMapper: T | Mapper<T>)=>void
  
  
  export type PartialUndef<O extends object> =
    { [Prop in keyof O]+?: O[Prop] | undefined }
  
  export type ComparatorEq<A,B = A> = (a:A,b:B)=>boolean
  export const defaultComparatorEq: ComparatorEq<any> = (a,b)=>a===b
  
  export type Predicate<T> = (obj: T)=>boolean
  export const defaultPredicate: Predicate<any> = obj=>!!obj
  
  
  
  export const trueOrUndef = (value: any): true|undefined => value ? true : undefined
  export const falsyToUndef = <T>(value: T) => value ? value : undefined
  export function exists<T extends anyval>(value: T): value is T & {} {
    return value!==null && value!==undefined
  }
  export function notExists<T extends anyval>(value: T): value is T & empty {
    return value===null || value===undefined
  }
  
}