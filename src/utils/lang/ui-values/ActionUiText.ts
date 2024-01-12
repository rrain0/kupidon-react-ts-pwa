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
  
  
  download: [
    {
      value: 'download',
      lang: 'en-US',
      text: 'Download',
    }, {
      value: 'download',
      lang: 'ru-RU',
      text: 'Скачать',
    },
  ] satisfies UiText<'download'>[],
  
  
  fullScreenView: [
    {
      value: 'fullScreenView',
      lang: 'en-US',
      text: 'Fullscreen view',
    }, {
      value: 'fullScreenView',
      lang: 'ru-RU',
      text: 'В полный экран',
    },
  ] satisfies UiText<'fullScreenView'>[],
  
  save: [
    {
      value: 'save',
      lang: 'en-US',
      text: 'Save',
    }, {
      value: 'save',
      lang: 'ru-RU',
      text: 'Сохранить',
    },
  ] satisfies UiText<'save'>[],
  saving: [
    {
      value: 'saving',
      lang: 'en-US',
      text: 'Saving',
    }, {
      value: 'saving',
      lang: 'ru-RU',
      text: 'Сохранение',
    },
  ] satisfies UiText<'saving'>[],
  saved: [
    {
      value: 'saved',
      lang: 'en-US',
      text: 'Saved',
    }, {
      value: 'saved',
      lang: 'ru-RU',
      text: 'Сохранено',
    },
  ] satisfies UiText<'saved'>[],
  
  cancel: [
    {
      value: 'cancel',
      lang: 'en-US',
      text: 'Cancel',
    }, {
      value: 'cancel',
      lang: 'ru-RU',
      text: 'Отменить',
    },
  ] satisfies UiText<'cancel'>[],
  
  
} satisfies Record<string, UiText[]>