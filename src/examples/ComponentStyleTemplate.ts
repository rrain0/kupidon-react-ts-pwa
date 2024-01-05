import { css } from '@emotion/react'
import { CommonStyle } from 'src/views/CommonStyle'
import generatePropVar = CommonStyle.generatePropVar
import generatePropVarDefault = CommonStyle.generatePropVarDefault
import generateAttrSelector = CommonStyle.generateAttrSelector
import generateAttrThisSelector = CommonStyle.generateAttrThisSelector
import generateElDotClass = CommonStyle.generateElDotClass
import generateElThis = CommonStyle.generateElThis




export namespace ComponentStyle {
  
  
  export namespace Attr {
    export const attr = {
      someAttr: 'data-some-attr',
    } as const
    export const select = generateAttrSelector(attr)
    export const selThis = generateAttrThisSelector(select)
  }
  export namespace El {
    export const clazz = {
      main:      'rrainuiMain',
      secondary: 'rrainuiSecondary',
    } as const
    
    export const dotClazz = generateElDotClass(clazz)
    
    // TODO set path to elements separately and generate via path
    const elMain = {
      main: dotClazz.main,
    } as const
    const elBasic = {
      secondary: elMain.main+'>'+dotClazz.secondary,
    } as const
    const elMainStateSimple = {
      mainHover:        elMain.main+':hover',
      mainActive:       elMain.main+':active',
      mainFocus:        elMain.main+':focus',
      mainFocusVisible: elMain.main+':focus-visible',
      mainDisabled:     elMain.main+':disabled',
    } as const
    const elMainStateComplex = {
      mainActiveFocusVisible: elMainStateSimple.mainActive+','+elMainStateSimple.mainFocusVisible,
    } as const
    const elBasicStateSimple = {
      secondaryDisabled:     elMainStateSimple.mainDisabled+'>'+dotClazz.secondary,
    } as const
    export const el = {
      ...elMain,
      ...elBasic,
      ...elMainStateSimple,
      ...elMainStateComplex,
      ...elBasicStateSimple,
    } as const
    
    export const thiz = generateElThis(el)
  }
  export namespace Prop {
    export const prop = {
      someProp: '--some-prop',
    } as const
    export const varr = generatePropVar(prop)
    export const vard = generatePropVarDefault(prop)
  }
  
  
  
  export const defolt = css`
    ${El.thiz.main}{
    
    }
  `
  
  
  
}