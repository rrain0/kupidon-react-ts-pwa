import { CommonUiText } from 'src/utils/ui-values/CommonUiText'
import { UiText, UiTextContainer } from 'src/utils/lang/UiText'



export const BottomNavBarUiText = {
  
  
  profile: CommonUiText.profile,
  
  
  chat: CommonUiText.chat,
  
  
  findCouples: [
    {
      value: 'findCouples',
      lang: 'en-US',
      text: 'Find couples',
    },{
      value: 'findCouples',
      lang: 'ru-RU',
      text: 'Найти пары',
    },
  ] as UiText<'findCouples'>[],
  
  
  advices: [
    {
      value: 'advices',
      lang: 'en-US',
      text: 'Advice',
    },{
      value: 'advices',
      lang: 'ru-RU',
      text: 'Советы',
    },
  ] as UiText<'advices'>[],
  
  
  settings: CommonUiText.settings,
  
  
  
  
} satisfies UiTextContainer