import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import NonEmptyArr = ArrayUtils.NonEmptyArr






/*
todo Restrict Values to only string keys

*/

export namespace ValidationCore {
  
  
  
  /**
   * @returns {'ok' | undefined | void} - валидатор не обнаружил ошибок
   * @returns {PartialFailureData} - валидатор обнаружил ошибку и вернул этот объект с ошибкой,
   * последующие валидаторы для этого поля не будут запущены.
   */
  export type Validator<Vs extends object> = [
    NonEmptyArr<keyof Vs>,
    (values: any[]) => ('ok' | undefined | void) | PartialFailureData<Vs>
  ]
  
  export type Validators<Vs extends object> = Validator<Vs>[]
  
  export type Failures<Vs extends object> = Failure<Vs>[]
  
  
  
  export class PartialFailureData<Vs extends object> {
    constructor(data: {
      code: string,
      msg?: string | undefined,
      extra?: any | undefined, // extra failure data if needed
      usedFields?: NonEmptyArr<keyof Vs> | undefined, // использованные для валидации поля
      usedValues?: NonEmptyArr<any> | undefined, // использованные для валидации значения полей
      highlightFields?: (keyof Vs)[] | undefined, // поля, которые выделить как ошибочные
      highlight?: boolean | undefined,
      notify?: boolean | undefined,
      canSubmit?: boolean | undefined,
      created?: Date | undefined,
      delay?: number | undefined,
    }) {
      this.code = data.code
      this.msg = data.msg
      this.extra = data.extra
      this.usedFields = data.usedFields
      this.usedValues = data.usedValues
      this.highlightFields = data.highlightFields
      this.highlight = data.highlight
      this.notify = data.notify
      this.canSubmit = data.canSubmit
      this.created = data.created
      this.delay = data.delay
    }
    
    code: string
    msg?: string | undefined
    extra?: any | undefined // extra failure data if needed
    usedFields?: NonEmptyArr<keyof Vs> | undefined // использованные для валидации поля
    usedValues?: NonEmptyArr<any> | undefined // использованные для валидации значения полей
    highlightFields?: (keyof Vs)[] | undefined // поля, которые выделить как ошибочные
    highlight?: boolean | undefined
    notify?: boolean | undefined
    canSubmit?: boolean | undefined
    created?: Date | undefined
    delay?: number | undefined
  }
  
  
  
  
  /**
   * @param code - error main code, eg 'incorrect', 'login-already-exists'
   * @param msg - message to display to user
   * @param usedFields - fields used to validate
   * @param usedValues - values used to validate
   * @param extra - some extra data of any type if needed
   * @param highlightFields - highlight this fields - failure is applied for this fields
   * @param highlight - highlight field with this error
   * @param notify - show error notification
   * @param canSubmit - can you submit if this error exists?
   * @param created - failure creation timestamp (Date object)
   * @param delay - delay to show (ms)
   */
  export type FailureData<Vs extends object> = {
    code: string
    msg?: string | undefined
    extra?: any | undefined, // extra failure data if needed
    
    usedFields: NonEmptyArr<keyof Vs> // использованные для валидации поля
    usedValues: NonEmptyArr<any> // использованные для валидации значения полей
    
    highlightFields?: (keyof Vs)[] | undefined // поля, которые выделить как ошибочные
    highlight?: boolean | undefined,
    notify?: boolean | undefined,
    canSubmit?: boolean | undefined,
    created?: Date | undefined
    delay?: number | undefined
  }
  
  
  
  export class Failure<Vs extends object> {
    
    static getAwaitDelay(created: Date, delay: number): Promise<void> {
      return new Promise(
        resolve=>setTimeout(resolve, +created + delay - +new Date())
      )
    }
    
    constructor(data: FailureData<Vs>) {
      this.msg = data.msg
      this.code = data.code
      this.extra = data.extra
      this.usedFields = data.usedFields
      this.usedValues = data.usedValues
      this.highlightFields = data.highlightFields ?? this.usedFields
      this.highlight = data.highlight ?? true
      this.notify = data.notify ?? true
      this.canSubmit = data.canSubmit ?? false
      this.created = data.created ?? new Date()
      this.delay = data.delay ?? 0
      this.awaitDelay = Failure.getAwaitDelay(this.created, this.delay)
    }
    
    
    readonly code: string
    readonly msg: string|undefined
    readonly extra: any
    readonly usedFields: NonEmptyArr<keyof Vs>
    readonly usedValues: NonEmptyArr<any>
    readonly highlightFields: (keyof Vs)[]
    readonly highlight: boolean
    readonly notify: boolean
    readonly canSubmit: boolean
    readonly created: Date
    readonly delay: number
    readonly awaitDelay: Promise<void>
    
    get id(){
      return `failure-${this.code}`
    }
    get isDelayed(){
      return this.delayedFor > 0
    }
    get delayedFor(){
      const showTime = +this.created + this.delay
      const now = +new Date()
      const delay = showTime - now
      return Math.max(delay,0)
    }
    
    copy(update?: Partial<FailureData<Vs>> | undefined): Failure<Vs> {
      return new Failure({
        code: update && 'code' in update ? update.code : this.code,
        msg: update && 'msg' in update ? update.msg : this.msg,
        extra: update && 'extra' in update ? update.extra : this.extra,
        usedFields: update && 'usedFields' in update ? update.usedFields : this.usedFields,
        usedValues: update && 'usedValues' in update ? update.usedValues : this.usedValues,
        highlightFields: update && 'highlightFields' in update ? update.highlightFields : this.highlightFields,
        highlight: update && 'highlight' in update ? update.highlight : this.highlight,
        notify: update && 'notify' in update ? update.notify : this.notify,
        canSubmit: update && 'canSubmit' in update ? update.canSubmit : this.canSubmit,
        created: update && 'created' in update ? update.created : this.created,
        delay: update && 'delay' in update ? update.delay : this.delay,
      })
    }
  }
  
  
  
  
}