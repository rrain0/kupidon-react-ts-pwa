/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { EmotionCommon } from 'src/styles/EmotionCommon';
import center = EmotionCommon.center;
import { css } from '@emotion/react';
import col = EmotionCommon.col;
import { useId, useState } from 'react';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { authState } from 'src/recoil/AuthState';
import { Navigate } from 'react-router-dom';
import { UserApi } from 'src/api/requests/UserApi';
import { InputStyle } from 'src/components/Inputs/InputStyle';
import Input from 'src/components/Inputs/Input';
import { AppRoutes } from 'src/app-routes/AppRoutes';
import { ButtonStyle } from 'src/components/Buttons/ButtonStyle';
import Button from 'src/components/Buttons/Button';
import PwdInput from 'src/components/Inputs/PwdInput';
import { Theme } from 'src/theme/Theme';
import row = EmotionCommon.row;
import reset = EmotionCommon.reset;
import RadioInput from 'src/components/Inputs/RadioInput';
import { RadioInputStyle } from 'src/components/Inputs/RadioInputStyle';



const SignupPage = () => {
  
  const id = useId()
  
  const setAuth = useSetRecoilState(authState)
  
  const [state,setState] = useState('none' as 'none'|'loading'|'success'|'error') // loading + error?
  const [error,setError] = useState(null as any)
  
  const [email,setEmail] = useState('')
  const [pwd,setPwd] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [sex,setSex] = useState('')
  const [birthDate,setBirthDate] = useState('')
  
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    void trySignup()
  }
  const trySignup = async ()=>{
    if (state==='loading') return
    setState('loading')
    try {
      const response = await UserApi.create({
        email, pwd, firstName, lastName, sex: sex as "MALE"|"FEMALE", birthDate
      })
      setAuth({
        accessToken: response.data.accessToken,
        user: response.data.user
      })
      setState('success')
    } catch (e){
      setState('error')
      setError((e as AxiosError).response?.data)
    }
  }
  
  
  return <Page>
    <Form onSubmit={onSubmit}>
      
      <h3 css={formHeader}>Регистрация</h3>
      
      <Input
        css={InputStyle.input}
        value={email}
        onChange={ev=>setEmail(ev.target.value)}
        placeholder='логин (email)' />
      <PwdInput
        css={InputStyle.input}
        value={pwd}
        onChange={ev=>setPwd(ev.target.value)}
        placeholder='пароль' />
      <Input
        css={InputStyle.input}
        value={firstName}
        onChange={ev=>setFirstName(ev.target.value)}
        placeholder='Имя' />
      <Input
        css={InputStyle.input}
        value={lastName}
        onChange={ev=>setLastName(ev.target.value)}
        placeholder='Фамилия' />
      <Input
        css={InputStyle.input}
        value={birthDate}
        onChange={ev=>setBirthDate(ev.target.value)}
        placeholder='День рождения (2000-12-30)' />
      
      <fieldset css={RadioGroupCss}>
        <RadioInput
          css={RadioInputStyle.input}
          name={`${id}-radio-group-sex`}
          value="MALE"
          checked={sex==='MALE'}
          onChange={ev=>setSex(ev.target.value)}
        >
          <div>Я парень</div>
        </RadioInput>
        <RadioInput
          css={RadioInputStyle.input}
          name={`${id}-radio-group-sex`}
          value="FEMALE"
          checked={sex==='FEMALE'}
          onChange={ev=>setSex(ev.target.value)}
        >
          <div>Я девушка</div>
        </RadioInput>
      </fieldset>
      
      <Button
        css={ButtonStyle.primary}
        type='submit'>
        Зарегистрироваться
      </Button>
      
      <div
        css={t=>css`
        font: 500 20px/129% Roboto;
        color: ${t.page.text};
      `}
      >
        { state==='loading' && 'Загрузка...' }
        { state==='success' && <Navigate to={`/${AppRoutes.profile}`} /> }
        { state==='error' && <div>
          Ошибка<br/>
          {JSON.stringify(error)}
        </div> }
      </div>
      
    </Form>
    
  </Page>
}

export default SignupPage




const Page = styled.main`
  min-width: 100%;
  min-height: 100%;
  ${center};
  padding: 32px;
  background: linear-gradient(
          to bottom right,
          ${p=>p.theme.page.bgc[0]} 0%,
          ${p=>p.theme.page.bgc[1]} 40% 60%,
          ${p=>p.theme.page.bgc[0]} 100%
  );
`


const Form = styled.form`
  max-width: 500px;
  width: 100%;
  ${col};
  gap: 16px;
`

const formHeader = (t: Theme.Theme) => css`
  font: 500 28px/150% Roboto;
  letter-spacing: 0.05em;
  color: ${t.page.text[0]};
  align-self: center;
`

const RadioGroupCss = css`
  ${reset};
  height: 50px;
  width: 100%;
  ${row};
  gap: 32px;
  justify-content: start;
  align-items: center;
`