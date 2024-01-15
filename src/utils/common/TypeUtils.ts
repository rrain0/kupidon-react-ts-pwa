




export namespace TypeUtils {
  
  export type empty = null|undefined
  export type anyval = {}|null|undefined
  export type falsy = false | undefined | null | '' | 0
  
  export const noop = ()=>{}
  export const trueOrUndef = (value: any): true|undefined => value ? true : undefined
  export const falsyToUndef = <T>(value: T) => value ? value : undefined
  
  export type Exists<T> = Exclude<T, null|undefined>
  export function exists<T extends anyval>(value: T): value is T & {} {
    return value!==null && value!==undefined
  }
  export function notExists<T extends anyval>(value: T): value is T & empty {
    return value===null || value===undefined
  }
  
  export type PartialUndef<O extends object> =
    { [Prop in keyof O]+?: O[Prop] | undefined }
  
  
  
  export type Callback = ()=>void
  export type Callback1<T> = (value: T)=>void
  export type CallbackN<T extends any[]> = (...args: T)=>void
  export type Setter<T> = Callback1<T>
  export type Consumer<T> = Callback1<T>
  export type Generator<T> = ()=>T
  export type Mapper<T> = (prevValue: T)=>T
  
  export type Predicate<T> = (obj: T)=>boolean
  export const defaultPredicate: Predicate<any> = obj=>!!obj
  export type Filter<T> = Predicate<T>
  
  export type Combiner<T1, T2 = T1> = (a: T1, b: T2)=>T1
  export type CombinerIndexed<T1, T2 = T1> = (a: T1, b: T2, aI: number, bI: number)=>T1
  export type Merger<T1, T2 = T1> = (a: T1, b: T2)=>[T1,T2]
  export type MergerIndexed<T1, T2 = T1> = (a: T1, b: T2, aI: number, bI: number)=>[T1,T2]
  
  export type ValueOrMapper<T> = T | Mapper<T>
  export type ValueOrGenerator<T> = T | Generator<T>
  export type Updater<T> = (mapper: Mapper<T>)=>void
  export type SetterOrUpdater<T> = (valueOrMapper: T | Mapper<T>)=>void
  
  export type ComparatorEq<A,B = A> = (a:A,b:B)=>boolean
  export const defaultComparatorEq: ComparatorEq<any> = (a,b)=>a===b
  
  
  
}