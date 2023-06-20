



export namespace RecoilUtils {
  
  export type ValOrUpdater<S> = S | ((currVal: S) => S)
  
}