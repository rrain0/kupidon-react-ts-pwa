


export namespace CssUtils {
  
  
  export type CssValue = { keyword: string } | { value: string, unit: string|undefined }
  const pattern = /^(?<keyword>(fit-content))|((?<value>((\+)|-)?((\d)*\.)?\d+)(?<unit>(%)|(px))?)$/i
  export const parseCssStringValue = (cssStringValue: string): CssValue|undefined =>{
    pattern.lastIndex = 0
    const match = cssStringValue.match(pattern)
    
    /*
     '-50.1%' => match with groups: {keyword: undefined, value: '-50.1', unit: '%'}
     '+50.1%' => match with groups: {keyword: undefined, value: '+50.1', unit: '%'}
     '50.1%' => match with groups: {keyword: undefined, value: '50.1', unit: '%'}
     '50.%' => null
     '.1%' => match with groups: {keyword: undefined, value: '.1', unit: '%'}
     '.%' => null
     '-.1' => match with groups: {keyword: undefined, value: '-.1', unit: undefined}
     'fit-content' => {keyword: 'fit-content', value: undefined, unit: undefined}
     */
    //console.log('match',match)
    //console.log('groups',match?.groups)
    
    if (match?.groups?.keyword)
      return { keyword: match.groups.keyword }
    if (match?.groups?.value)
      return { value: match.groups.value, unit: match?.groups?.unit }
    return undefined
  }
}
