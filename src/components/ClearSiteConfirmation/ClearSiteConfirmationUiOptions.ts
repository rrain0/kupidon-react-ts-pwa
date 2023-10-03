import { QuickSettingsUiOptions } from 'src/components/QuickSettings/QuickSettingsUiOptions'
import { CommonUiOptions } from 'src/utils/app/CommonUiOptions'
import { UiOptionsContainer } from 'src/utils/lang/UiOption'




export const ClearSiteConfirmationUiOptions = {
  clearAppData: QuickSettingsUiOptions.clearAppData,
  reloading: CommonUiOptions.reloading,
  yes: CommonUiOptions.yes,
  no: CommonUiOptions.no,
} satisfies UiOptionsContainer