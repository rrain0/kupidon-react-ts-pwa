


export namespace ValidCore {
  
  export type Validator<
    Values extends object = object,
  > = (values: Values, failures: Failure[])=>unknown
  
  
  export class Failure {
    /**
     * @param value - value that caused this failure
     * @param code - error main code, eg 'incorrect', 'login-already-exists'
     * @param extraCode - error extra code
     * @param msg - message to display to user
     * @param extra - some extra data of any type if needed
     * @param highlighted - fields by names to be error-highlighted
     * @param notified - notifications by ids to be showed
     */
    constructor(
      // failure info
      readonly value: any,
      readonly code: string|number,
      readonly msg: string = '',
      readonly extraCode: string|number|undefined = undefined,
      readonly extra: any = undefined,
      
      // failure state
      readonly highlighted: string[] = [],
      readonly notified: string|undefined = undefined,
    ){}
  }
  
  
}