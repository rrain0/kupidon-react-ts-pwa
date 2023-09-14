


export namespace CssUtils {
  
  const keywords = ['fit-content']
  const units = ['%','px']
  const keywordPattern = `(?<keyword>${keywords.map(it=>`(${it})`).join('|')})`
  const valuePattern = `(?<value>(\\+|-)?((\\d)*\\.)?\\d+(e(\\+|-)?\\d+)?)`
  const unitPattern = `(?<unit>${units.map(it=>`(${it})`).join('|')})`
  const pattern = new RegExp(`^(${keywordPattern}|(${valuePattern}${unitPattern}?))$`,'i')
  //const pattern = /^((?<keyword>(fit-content))|((?<value>(\+|-)?((\d)*\.)?\d+(e(\+|-)?\d+)?)(?<unit>(%)|(px))?))$/i
  
  export type CssValue = { keyword: string } | { value: string, unit: string|undefined }
  export const parseCssStringValue = (cssStringValue: string): CssValue|undefined => {
    pattern.lastIndex = 0
    const match = cssStringValue.match(pattern)
    
    /*
     '-.2e-.1' => null
     '-.2e-1' => match with groups: {keyword: undefined, value: '-.2e-1', unit: undefined}
     '0' => match with groups: {keyword: undefined, value: '0', unit: undefined}
     '1e6' => match with groups: {keyword: undefined, value: '1e6', unit: undefined}
     '1e+6' => match with groups: {keyword: undefined, value: '1e+6', unit: undefined}
     '1e-6' => match with groups: {keyword: undefined, value: '1e-6', unit: undefined}
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
