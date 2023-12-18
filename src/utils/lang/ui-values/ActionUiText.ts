import { UiText } from 'src/utils/lang/UiText'




export const ActionUiText = {
  
  
  remove: [
    {
      value: 'remove',
      lang: 'en-US',
      text: 'Remove',
    }, {
      value: 'remove',
      lang: 'ru-RU',
      text: 'Удалить',
    },
  ] satisfies UiText<'remove'>[],
  
  
  replace: [
    {
      value: 'replace',
      lang: 'en-US',
      text: 'Replace',
    }, {
      value: 'replace',
      lang: 'ru-RU',
      text: 'Заменить',
    },
  ] satisfies UiText<'replace'>[],
  
  
} satisfies Record<string, UiText[]>