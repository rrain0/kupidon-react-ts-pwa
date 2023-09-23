import { useMedia } from 'src/utils-react/media/useMedia'


/*
  https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
  css 'color-scheme: light dark;'
 
  https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
  css '@media (prefers-color-scheme: dark) { }'
*/


export const useThemeDetector = ()=>{
  const matches = useMedia('(prefers-color-scheme: dark)')
  return matches ? 'dark' : 'light'
}