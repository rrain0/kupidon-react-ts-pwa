


export namespace ValidationCore {
  
  export type Value = unknown
  export const outer: unique symbol = Symbol('outer failure')
  export type Values = object
  export type Field<Vs extends Values> = keyof Vs | typeof outer
  
  
  /**
   * @returns {'ok' | undefined | void} - валидатор не обнаружил ошибок
   * @returns {Failure} - валидатор обнаружил ошибку и вернул этот объект с ошибкой,
   * последующие валидаторы для этого поля не будут запущены.
   */
  export type Validator<Vs extends Values = Values> = [
    Field<Vs>[],
    (values: any[]) =>
      'ok' | undefined | void
      | FailureData<Vs>
  ]
  
  export type Validators<Vs extends Values> = Validator<Vs>[]
  
  export type Failures<Vs extends Values> = Failure<Vs>[]
  
  
  
  
  
  export class FailureData<Vs extends Values> {
    constructor(public data: {
      code?: string|undefined,
      extraCode?: string|undefined,
      msg: string,
      fields?: Field<Vs>[] | undefined, // какие поля выделять
      usedFields?: Field<Vs>[] | undefined,
      usedValues?: any[] | undefined,
      type?: 'format'|'outer'|undefined,
      //priority: number, // higher number - higher priority
      highlight?: boolean|undefined,
      notify?: boolean|undefined,
      extra?: any,
      created?: Date|undefined,
      delay?: number|undefined,
    }){}
    
    get fullCode(){
      return `${this.data.code}${this.data.extraCode?`-${this.data.extraCode}`:''}`
    }
  }
  
  
  
  export class Failure<Vs extends Values> {
    /**
     * @param code - error main code, eg 'incorrect', 'login-already-exists'
     * @param extraCode - error extra code
     * @param msg - message to display to user
     * @param fields - failure is applied for this fields
     * @param usedFields - fields used to validate
     * @param usedValues - values used to validate
     * @param type - type of failure - validation error or outer network/server error
     * @param highlight - highlight field with this error
     * @param notify - show error notification
     * @param extra - some extra data of any type if needed
     */
    constructor(
      public code: string,
      public extraCode: string|undefined,
      public msg: string,
      public fields: Field<Vs>[], // какие поля выделять
      public usedFields: Field<Vs>[],
      public usedValues: any[],
      public type: 'format'|'outer',
      //public priority: number, // higher number - higher priority
      public highlight: boolean,
      public notify: boolean,
      public extra: any,
      public created: Date,
      public delay: number,
    ){}
    
    static ofData<Vs extends Values>(data: FailureData<Vs>){
      const d = data.data
      return new Failure(
        d.code ?? '', d.extraCode, d.msg,
        d.fields ?? [], d.usedFields ?? [], d.usedValues ?? [],
        d.type ?? 'format',
        d.highlight ?? true, d.notify ?? true,
        d.extra,
        d.created ?? new Date(), d.delay ?? 0
      )
    }
    
    get fullCode(){
      return `${this.code}${this.extraCode?`-${this.extraCode}`:''}`
    }
    get id(){
      //return `failure-${this.fieldName}-${this.fullCode}`
      return `failure-${this.fullCode}`
    }
    
    get highlightNow(){
      return +new Date() >= +this.created+this.delay && this.highlight
    }
    get notifyNow(){
      return +new Date() >= +this.created+this.delay && this.notify
    }
  }
  
}