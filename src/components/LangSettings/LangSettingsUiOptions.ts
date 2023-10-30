import { CommonUiOptions } from 'src/utils/app/CommonUiOptions'
import { UiOption } from 'src/utils/lang/UiOption'



export const LangSettingsUiOptions = {
  
  
  systemLanguage: CommonUiOptions.systemLanguage,
  russian: CommonUiOptions.russian,
  english: CommonUiOptions.english,
  
  
} satisfies Record<string, UiOption<any>[]>