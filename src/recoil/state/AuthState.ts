import { atom } from 'recoil'
import { emptyValOrObj, localStorageEffect2 } from '../RecoilPersist'
import { UserApi } from 'src/api/requests/UserApi'
import CurrentUser = UserApi.CurrentUser



/*
  accessToken:
    undefined - пользователь разлогинен. Считается, что в куках нет валидного рефреш токена.
      Пользователь считается разлогиненным, если на refresh запрос получен ответ 401.
    string - конкретный access токен. Токен может быть просрочен, но известно, что пользователь вошёл в систему.
    
  user: получается вместе начальным получением accessToken (вход, регистрация).
    Если есть accessToken, значит и user тоже не null.
*/
export type AuthStateType = undefined|{
  accessToken: string,
  user: CurrentUser,
}
export const authState = atom<AuthStateType>({
  key: 'auth',
  default: undefined,
  effects: [localStorageEffect2({ removeWhen: ['reset',emptyValOrObj] })],
})


