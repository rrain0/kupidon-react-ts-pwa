import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef
import ObjectEntries = ObjectUtils.ObjectEntries




export namespace CommonStyle {
  
  
  
  
  export type DataAttrState<V extends readonly string[]>
    = Record<V[number], DataAttr<any>>
  
  export class DataAttr<const V extends readonly string[]> {
    readonly rawName: string
    readonly name: string
    
    readonly sel: string
    readonly thisSel: string
    
    readonly values: V
    
    readonly s: DataAttrState<V>
    
    constructor(rawName: string, values: V) {
      this.rawName = rawName
      this.name = `data-${this.rawName}`
      this.values = values
      
      this.sel = `[${this.name}]`
      this.thisSel = `&${this.sel}`
      
      const attrState = {} as DataAttrState<V>
      this.values.forEach(value=>{
        attrState[value] = new DataAttr(`${this.rawName}=${value}`,[])
      })
      this.s = attrState
    }
  }
  
  /* { // attr test
    const AttrDirection = new DataAttr('direction',['vertical','horizontal'])
    console.log('AttrDirection',AttrDirection)
    
    const isHorizontalDirection = AttrDirection.s.horizontal.sel
    const isVerticalDirection = AttrDirection.s.vertical.sel
    console.log('isHorizontalDirection',isHorizontalDirection)
    console.log('isVerticalDirection',isVerticalDirection)
  } */
  
  
  
  
  export class PseudoClass {
    readonly name: string
    
    readonly sel: string
    readonly thisSel: string
    
    constructor(name: string) {
      this.name = name
      
      this.sel = `:${this.name}`
      this.thisSel = `&${this.sel}`
    }
  }
  
  export const hover = new PseudoClass('hover')
  export const active = new PseudoClass('active')
  
  
  
  
  export function combineStates(...states: (PseudoClass|DataAttr<any>)[]): PseudoClass {
    return new PseudoClass(`is(${states.map(it=>it.sel).join(',')})`)
  }
  
  
  
  export type ElemStateDescriptor<N extends string>
    = Record<N, PseudoClass|DataAttr<any>>
  export type ElemState<N extends string>
    = Record<N, Elem<any>>
  
  export class Elem<N extends string> {
    readonly name: string
    readonly states: ElemStateDescriptor<N>
    
    readonly sel: string
    readonly thisSel: string
    
    readonly s: ElemState<N>
    
    constructor(name: string, states: ElemStateDescriptor<N>) {
      this.name = name
      this.states = states
      
      this.sel = `.${this.name}`
      this.thisSel = `&${this.sel}`
      
      const elemState = {} as ElemState<N>
      ObjectEntries(this.states).forEach(([name,state])=>{
        elemState[name] = new Elem(`${this.name}${state.sel}`,{})
      })
      this.s = elemState
    }
    
    withNested(nestingSelector: string, element: Elem<any>): Elem<N> {
      const nested = new Elem(
        this.name+nestingSelector+element.sel,
        this.states
      )
      ObjectEntries(this.s).forEach(([key,value])=>{
        nested.s[key] = new Elem(
          value.name+nestingSelector+element.sel,
          value.states
        )
      })
      return nested
    }
  }
  
  /* { // Elem test
    const hover = new PseudoClass('hover')
    const active = new PseudoClass('active')
    const highlight = new DataAttr('highlight',[])
    const direction = new DataAttr('direction',['vertical','horizontal'])
    
    const btnElem = new Elem('rrainuiButton',{
      hover: hover,
      active: combineStates(active, highlight),
      direction: direction,
      vertical: direction.s.vertical,
      horizontal: direction.s.horizontal,
    })
    
    const rawBorderElem = new Elem('rrainuiBorder',{})
    const borderElem = btnElem.withNested('>',rawBorderElem)
    
    const rawRippleElem = new Elem('rrainuiRipple',{})
    const rippleElem = borderElem.withNested('>',rawRippleElem)
    
    console.log('btnElem',btnElem)
    console.log('borderElem',borderElem)
    console.log('rippleElem',rippleElem)
    
    const btnHover = btnElem.s.hover
    const btnVertical = btnElem.s.vertical
    //const btnVertical1 = btnElem.s.vertical1 // error - no such state
  } */
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  export namespace Attr0 {
    export const attr = {
      error: 'data-error'
    } as const
    export const select = generateAttrSelector(attr)
    export const selThis = generateAttrThisSelector(select)
    
    export type errorJsxProp =
      PartialUndef<{ [attr.error]: boolean }>
    export type errorHtmlProp =
      PartialUndef<{ [attr.error]: true|undefined }>
  }
  export namespace Prop {
    export const prop = {
      color: '--color',
    } as const
    export const varr = generatePropVar(prop)
    export const vard = generatePropVarDefault(prop)
  }
  
  
  
  
  
  
  
  
  
  export type PropObject<T extends string> = Record<T,string>
  export type PropGenerator<T extends string> = Record<T,(value:string)=>string>
  
  
  
  // attr-name -> [attr-name]
  export function generateAttrSelector<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = {...props}
    for (const propName in mappedProps) {
      mappedProps[propName] = `[${props[propName]}]`
    }
    return mappedProps
  }
  
  // [attr-name] -> &[attr-name]
  export function generateAttrThisSelector<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = {...props}
    for (const propName in mappedProps) {
      mappedProps[propName] = `&${props[propName]}`
    }
    return mappedProps
  }
  
  
  
  // --prop-name -> var(--prop-name)
  export function generatePropVar<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = {...props}
    for (const propName in mappedProps) {
      mappedProps[propName] = `var(${props[propName]})`
    }
    return mappedProps
  }
  
  // --prop-name -> var(--prop-name, default)
  export function generatePropVarDefault<T extends string>(props: PropObject<T>): PropGenerator<T> {
    const mappedProps = {...props} as unknown as PropGenerator<T>
    for (const propName in mappedProps) {
      mappedProps[propName] = (defolt: string)=>`var(${props[propName]},${defolt})`
    }
    return mappedProps
  }
  
  
  
  // class -> .class
  export function generateElDotClass<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = {...props}
    for (const propName in mappedProps) {
      mappedProps[propName] = `.${props[propName]}`
    }
    return mappedProps
  }
  
  // element-selector -> &element-selector
  export function generateElThis<T extends string>(props: PropObject<T>): PropObject<T> {
    const mappedProps = {...props}
    for (const propName in mappedProps) {
      mappedProps[propName] = `&${props[propName]}`
    }
    return mappedProps
  }
  
  
  
}