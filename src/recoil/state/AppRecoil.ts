import { atom } from 'recoil'











export type AppRecoilType = {
  canInstall: boolean
}
export const AppRecoil = atom<AppRecoilType>({
  key: 'app',
  default: {
    canInstall: false,
  },
})


