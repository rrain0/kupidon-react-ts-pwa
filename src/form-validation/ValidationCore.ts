import { Utils } from 'src/utils/Utils';


export namespace ValidationCore {
  import ObjectValues = Utils.ObjectValues
  
  
  export type Value = unknown
  export type Values = object
  
  export type ValidationType = 'auto'|'submit'
  
  /**
   * @returns {'ok' | undefined | void} - валидатор не обнаружил ошибок
   * @returns {'ok-stop'} - валидатор не обнаружил ошибок и говорит, что дальнейшая валидация не нужна
   * @returns {Failure0} - валидатор обнаружил ошибку и вернул этот объект с ошибкой,
   * последующие валидаторы для этого поля не будут запущены.
   * @returns {'later'} - валидатор сообщает, что сейчас не может провести валидацию,
   * потому что валидация текущего поля зависит от корректности данных других полей.
   * Вскоре будет произведён повторный запуск этого валидатора.
   */
  export type Validator<
    V extends Value = Value,
    Vs extends Values = Values,
    Fs = Partial<Failures<Vs>>
  > =
    (info: { value: V, values: Vs, failures: Fs, type: ValidationType }) =>
      'ok' | undefined | void
      | 'ok-stop'
      | FailureData
      | 'later'
  
  export type Validators<Vs extends Values> = { [Field in keyof Vs]?: Validator<Vs[Field],Vs>[] }
  
  
  export class FormFailures<Vs extends Values> {
    constructor(
      readonly id: string | undefined,
      readonly failures: Failures<Vs>,
    ){}
    
    hasFailure(){
      return ObjectValues(this.failures).some(v=>v!==null)
    }
    firstFailure(){
      return ObjectValues(this.failures).find(v=>v!==null)
    }
  }
  
  
  // undefined - error check is not completed
  // null - errors was not found - all is of
  // Failure2 - found an error
  export type Failures<Vs extends object> = { [Field in keyof Vs]?: Failure0|undefined|null }
  
  
  
  
  export class Failure0 {
    /**
     * @param code - error main code, eg 'incorrect', 'login-already-exists'
     * @param extraCode - error extra code
     * @param msg - message to display to user
     * @param extra - some extra data of any type if needed
     * @param highlight - highlight field with this error
     * @param notify - show error notification
     */
    constructor(
      readonly fieldName: string,
      readonly value: any,
      readonly code: string,
      readonly extraCode: string|undefined = undefined,
      readonly msg: string = '',
      readonly extra: any = undefined,
      readonly highlight = true,
      readonly notify = true,
    ){}
    static of(fieldName: string, value: any, data: FailureData){
      const d = data.data
      return new Failure0(fieldName, value, d.code, d.extraCode, d.msg, d.extra, d.highlight, d.notify)
    }
    
    get fullCode(){
      return `${this.code}${this.extraCode?`-${this.extraCode}`:''}`
    }
    get id(){
      return `failure-${this.fieldName}-${this.fullCode}`
    }
  }
  
  
  export class FailureData {
    constructor(public data: {
      code: string
      extraCode?: string|undefined
      msg: string
      extra?: any
      highlight?: boolean
      notify?: boolean
    }){}
    
    get fullCode(){
      return `${this.data.code}${this.data.extraCode?`-${this.data.extraCode}`:''}`
    }
  }
  
  
  
  class Failure {
    constructor(
      public code: string,
      public extraCode: string,
      public msg: string,
      public fields: string[],
      public values: any[], // ???
      public type: 'validation'|'outer',
      public priority: number, // higher number - higher priority
      public highlight: boolean,
      public notify: boolean,
    ) {}
    
    get fullCode(){
      return `${this.code}${this.extraCode?`-${this.extraCode}`:''}`
    }
  }
  
}