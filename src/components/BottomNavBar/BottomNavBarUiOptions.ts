import { CommonUiOptions } from 'src/utils/app/CommonUiOptions'
import { UiOption } from 'src/utils/react/lang/UiOption'



export const BottomNavBarUiOptions = {
  
  
  profile: CommonUiOptions.profile,
  
  
  chat: CommonUiOptions.chat,
  
  
  findCouples: [
    {
      value: 'findCouples',
      lang: 'en-US',
      text: 'Find couples',
    },
    {
      value: 'findCouples',
      lang: 'ru-RU',
      text: 'Найти пары',
    },
  ] as UiOption<'findCouples'>[],
  
  
  advices: [
    {
      value: 'advices',
      lang: 'en-US',
      text: 'Advice',
    },
    {
      value: 'advices',
      lang: 'ru-RU',
      text: 'Советы',
    },
  ] as UiOption<'advices'>[],
  
  
  settings: CommonUiOptions.settings,
  
  
  
  
} satisfies Record<string, UiOption<any>[]>