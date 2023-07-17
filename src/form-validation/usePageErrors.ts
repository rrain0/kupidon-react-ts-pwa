
import {useState} from "react";
import { Utils } from 'src/utils/Utils';


export namespace UsePageErrors {
  import empty = Utils.empty
  import ObjectEntries = Utils.ObjectEntries
  
  
  // todo стоит предоставлять сюда дефолтные значения
  
  
  //export const notValidate = Symbol('not-validate')
  //export type SpecialValue = typeof notValidate
  //type ValuesWithSpecial<Vs extends Values> = { [Field in keyof Vs]: Vs[Field] | typeof notValidate }
  
  export type Value = {}|null|undefined
  
  export type Values = object
  
  export type Errors<Vs extends Values, Vds extends Validators<Vs>> =
    { [Field in keyof Vs]: ElementErrors<Vs[Field]/*, ErrorCode<Vs, Vds, Field>, ErrorCode2<Vs, Vds, Field>*/> }
  
  
  // type ErrorCode<Vs extends Values, Vds extends Validators<Vs>, Field extends keyof Vs> =
  //   Vds[Field] extends Array<infer Vd> ? (Vd extends Validator<infer V, Vs, infer Es, infer C, infer C2> ? C : never) : never
  // type ErrorCode2<Vs extends Values, Vds extends Validators<Vs>, Field extends keyof Vs> =
  //   Vds[Field] extends Array<infer Vd> ? (Vd extends Validator<infer V, Vs, infer Es, infer C, infer C2> ? C2 : never) : never
  
  
  
  /**
   * @returns {undefined | void} - валидатор не обнаружил ошибок
   * @returns {ErrorObj} - валидатор обнаружил ошибку и вернул этот объект с ошибкой
   * @returns {'later'} - валидатор сообщает, что сейчас не может провести валидацию,
   * потому что валидация текущего поля зависит от корректности данных других полей
   */
  export type Validator<
    V extends Value,
    Vs extends Values,
    Es = Partial<Errors<Vs, Validators<Vs>>>,
    C extends Code = Code,
    C2 extends Code2 = undefined,
  > = (value: V, values: Vs, errors: Es) => ErrorObj<C,C2> | 'later' | undefined | void
  
  
  export type Validators<Vs extends Values> = { [Field in keyof Vs]?: Validator<Vs[Field],Vs>[] }
  
  
  
  
  
  
  
  
  export class FormErrors<Vs extends Values, Vds extends Validators<Vs>> {
    constructor(
      readonly id: string,
      readonly errors: Errors<Vs,Vds>,
    ) {}
    
    hasError(){
      return Object.values<ElementErrors>(this.errors)
        .some(it=>it.hasError())
    }
    firstError(){
      return Object.values<ElementErrors>(this.errors)
        .find(it=>it.hasError())
        ?.firstError()
    }
    /*removeErrors(){
      // @ts-ignore
      Object.keys(this.errors).forEach(key=>this.errors[key]=undefined)
    }*/
    
    clone() {
      return new FormErrors(this.id, this.errors)
    }
  }
  
  
  
  export class ElementErrors<V extends Value = unknown, C extends Code = Code, C2 extends Code2 = undefined> {
    constructor(
      readonly id: string,
      readonly value: V,
      readonly hideHighlight = false,
      readonly hideNotification = false,
      readonly errors: ErrorObj<C,C2>[] = []
    ) {}
    
    hasError(){ return this.errors.length>0 }
    firstError(){ return this.errors[0] as ErrorObj|undefined }
    showHighlight(){ return this.hasError() && !this.hideHighlight }
    showNotification(){ return this.hasError() && !this.hideNotification }
    
    clone() {
      return new ElementErrors(this.id, this.value, this.hideHighlight, this.hideNotification, this.errors)
    }
  }
  
  
  export type Code = string|number
  export type Code2 = string|number|undefined
  export class ErrorObj<C extends Code = Code, C2 extends Code2 = undefined> {
    /**
     *
     * @param code
     * 404 - not found
     * 403 - unauthorized while login
     * 401 - forbidden if try to access to resource and can't
     * 'incorrect' - incorrect data
     * etc: any string or number you wish
     * @param code2 - same as code, but more detailed
     * @param msg - message to display to user
     * @param extra - some extra data of any type if needed
     */
    constructor(
      readonly code: C,
      readonly code2: C2,
      readonly msg: string,
      readonly extra: any|undefined,
    ) {}
    static of<C extends Code = Code>(code: C, msg: string){
      return new ErrorObj(code, undefined, msg, undefined)
    }
    static of2<C extends Code = Code, C2 extends Code2 = undefined>(code: C, code2: C2, msg: string){
      return new ErrorObj(code, code2, msg, undefined)
    }
    
    clone() {
      return new ErrorObj(this.code, this.code2, this.msg, this.extra)
    }
  }
  
  
  
  
  
  export const validate = <Vs extends Values, Vds extends Validators<Vs>>(
    values: Vs,
    validators: Validators<Vs>,
    prevErrors: FormErrors<Vs,Vds>|undefined = undefined,
    config: { mode: 'form-first-error' | 'field-first-error' | 'all-errors' } = { mode: 'field-first-error' },
  ): FormErrors<Vs,Vds> => {
    
    const errors: Partial<Errors<Vs,Vds>> = {}
    
    // fields to validators
    const fToVds = ObjectEntries(validators)
    
    loop: for (let i = 0; i < fToVds.length; i++) {
      const fToVd = fToVds[i]
      const f = fToVd[0]
      const vds = validators[f]
      const v = values[f]
      // todo использовать кешированные значения чтобы снова не проверять (но тут валидаторы нескольких полей в пролёте)
      //  или отправлять в value undefined который будет говорить о том, что не перепроверять это значение
      //  Можно фиксировать через геттеры, какие поля пытался взять валидатор и проверять изменились ли они и валидатор
      //  но опять же валидатор в первой итерации может ещё не запросить все поля, потому что ошибка
      /*if (prevErrors && v===prevErrors.errors[f].value){
      
      }*/
      if (!errors[f]) errors[f] = new ElementErrors(f,v)
      if(vds) for (let i = 0; i < vds.length; i++) {
        const vd = vds[i]
        const result = vd(v,values,errors)
        if (result==='later'){
          // todo проверка на циклические зависимости
          // помещаем текущую запись в конец
          fToVds[i] = fToVds[fToVds.length-1]
          fToVds[fToVds.length-1] = fToVd
          i--
          continue
        } else if (result===undefined){
          // all is ok - there is no error
        } else if (result) {
          errors[f]!.errors.push(result)
          if (config.mode==='form-first-error') break loop
          if (config.mode==='field-first-error') continue loop
        }
      }
    }
    
    // todo form id
    return new FormErrors('', errors as Errors<Vs,Vds>)
  }
  
  
  // сначала проверить не выполнено ли уже действие, а потом пересоздать все объекты
  export const removeErrors = <Vs extends Values, Vds extends Validators<Vs>>(
    formErrors: FormErrors<Vs,Vds>|undefined, field?: keyof Vs | undefined
  )=>{
    if(!formErrors) return undefined
    if (field===undefined){
      if (Object.values<ElementErrors>(formErrors.errors)
        .every(it=>it.errors.length===0)) return formErrors
      const old = formErrors.errors
      const now = { ...old }
      Object.keys(old).forEach(key=>now[key] = new ElementErrors(old[key].id, old[key].value))
      return new FormErrors(formErrors.id, now)
    }
    const old = formErrors.errors[field]
    if (old.errors.length===0) return formErrors
    const now = new ElementErrors(old.id, old.value, old.hideHighlight, old.hideNotification, [])
    const newErrors = { ...formErrors.errors, [field]: now } as typeof formErrors.errors
    return new FormErrors(formErrors.id, newErrors)
  }
  
  export const hideHighlight = <Vs extends Values, Vds extends Validators<Vs>>(
    formErrors: FormErrors<Vs, Vds>|undefined, field: keyof Vs
  )=>{
    if(!formErrors) return undefined
    const old = formErrors.errors[field]
    if (old.errors.length===0) return formErrors
    const now = new ElementErrors(old.id, old.value, true, old.hideNotification, old.errors)
    const newErrors = { ...formErrors.errors, [field]: now } as typeof formErrors.errors
    return new FormErrors(formErrors.id, newErrors)
  }
  
  export const hideNotification = <Vs extends Values, Vds extends Validators<Vs>>(
    formErrors: FormErrors<Vs, Vds>|undefined, field: keyof Vs
  )=>{
    if(!formErrors) return undefined
    const old = formErrors.errors[field]
    if (old.errors.length===0) return formErrors
    const now = new ElementErrors(old.id, old.value, old.hideHighlight, true, old.errors)
    const newErrors = { ...formErrors.errors, [field]: now } as typeof formErrors.errors
    return new FormErrors(formErrors.id, newErrors)
  }
  
  export const hideHighlightAndNotification = <Vs extends Values, Vds extends Validators<Vs>>(
    formErrors: FormErrors<Vs, Vds>|undefined, field: keyof Vs
  )=>{
    if(!formErrors) return undefined
    const old = formErrors.errors[field]
    if (old.errors.length===0) return formErrors
    const now = new ElementErrors(old.id, old.value, true, true, old.errors)
    const newErrors = { ...formErrors.errors, [field]: now } as typeof formErrors.errors
    return new FormErrors(formErrors.id, newErrors)
  }
  
  
  
  const emailPattern = /^[^\s@]+@[^\s@]+$/
  const isValidEmail = (email?: string|empty) => email && emailPattern.test(email)
  export const emailValidator = (email?: string|empty): ErrorObj|undefined => {
    if (!isValidEmail(email))
      return ErrorObj.of('incorrect', 'Некорректный формат email')
  }
  
  
  export const robotValidator = (checked?: boolean|empty): ErrorObj|undefined => {
    if (!checked) return ErrorObj.of('required','Подтвердите, что вы не робот')
  }
  export const requiredValidator = (value: string|undefined): ErrorObj|undefined => {
    if (!value || !value.length) return ErrorObj.of('required','Поле обязательно для заполнения')
  }
  export const pwdValidator = (value: string|undefined): ErrorObj|undefined => {
    if (!value || value.length<6)
      return ErrorObj.of('incorrect','Пароль должен быть не короче 6 символов')
  }
  export const repeatPwdValidator = (pwd: string|undefined, repeatedPwd: string|undefined): ErrorObj|undefined|'later' => {
    if (!pwd && !repeatedPwd) return 'later'
    if (pwd!==repeatedPwd)
      return ErrorObj.of('incorrect','Пароли должны совпадать')
  }
  
  
  
  
  const isPositiveInteger = (i: number) => {
    return Number.isSafeInteger(i) && i>0
  }
  const isNonNegativeInteger = (i: number) => {
    return Number.isSafeInteger(i) && i>=0
  }
  
  export const required = (value: string, message: string) =>
    value.length<=0 ? ErrorObj.of('required', message) : undefined
  
  export const checkPositiveInteger = (value: string, message: string) => {
    const v = +value
    return !(Number.isSafeInteger(+v) && v>0) ? ErrorObj.of('incorrect', message) : undefined
  }
  
  
  
  
  
  
  export function usePageErrors<Vs extends Values, Vds extends Validators<Vs>>(validators: Vds){
    
    
    const [errors, setErrors] = useState(undefined as FormErrors<Vs,Vds>|undefined)
    
    return {
      errors,
      validate: (values: Vs)=>{
        const newErrors = validate(values,validators,errors)
        setErrors(newErrors)
      },
      removeErrors: (field?: keyof Vs | undefined)=>{
        const newErrors = removeErrors(errors,field)
        setErrors(newErrors)
      },
      hideHighlight: (field: keyof Vs)=>{
        const newErrors = hideHighlight(errors,field)
        setErrors(newErrors)
      },
      hideNotification: (field: keyof Vs)=>{
        const newErrors = hideNotification(errors,field)
        setErrors(newErrors)
      },
      hideHighlightAndNotification: (field: keyof Vs)=>{
        const newErrors = hideHighlightAndNotification(errors,field)
        setErrors(newErrors)
      },
      //todo
      // нужно по кнопке менять стейт страницы, говорящий о том, что нужно сделать запрос
      // по изменению этого стейта useEffect проверит, нет ли ошибок - иначе из хука нормально ошибки не беруться
      /*getActualErrors: ()=>{
        let es: typeof errors
        setErrors(it=>(es=it))
        return es
      }*/
    }
  }
  
  
}