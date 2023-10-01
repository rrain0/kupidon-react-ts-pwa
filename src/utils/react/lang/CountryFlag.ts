import { Lang } from 'src/recoil/state/LangRecoil'
import russiaFlag from 'src/res/icon/country-flag/russia-flag-icon.png'
import usaFlag from 'src/res/icon/country-flag/usa-flag-icon.jpg'


export const CountryFlag: Record<Lang, string> = {
  'en-US': usaFlag,
  'ru-RU': russiaFlag,
}