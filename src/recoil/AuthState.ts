import { atom } from 'recoil';
import { localStorageEffect } from './RecoilPersist';
import { UserApi } from '../api/requests/UserApi';
import CurrentUser = UserApi.CurrentUser;



/*
  accessToken:
    null - пользователь разлогинен. Считается, что в куках нет валидного рефреш токена.
      Пользователь считается разлогиненным, если на refresh запрос получен ответ 401.
    string - конкретный access токен. Токен может быть просрочен, но известно, что пользователь вошёл в систему.
    
  user: получается вместе начальным получением accessToken (вход, регистрация).
    Если есть accessToken, значит и user тоже не null.
*/
export type AuthStateType = null|{
  accessToken: string,
  user: CurrentUser,
}
export const authState = atom<AuthStateType>({
  key: 'auth',
  default: null,
  effects: [
    /*({setSelf, onSet}) => {
      onSet((newValue, oldValue, isReset) => {
        if (newValue===null) {
        
        }
      })
    },*/
    localStorageEffect
  ],
})


