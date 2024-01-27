import { atom } from 'recoil'











export type AppRecoilType = {
  canInstall: boolean
  modalOutletId: string | undefined
  isDraggingFiles: boolean
  isUsingGestures: false | string
}
export const AppRecoil = atom<AppRecoilType>({
  key: 'app',
  default: {
    canInstall: false,
    modalOutletId: undefined,
    isDraggingFiles: false,
    isUsingGestures: false,
  },
})


