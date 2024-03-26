import './loginView.scss';

import { useState } from 'react';
import { Button } from '../../components/login-signup-button/Button';
import { Input } from '../../components/login-signup-input/Input';

export const LoginView = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <div className='login-container'>

      <Input 
        email={email} 
        handleOnChangeEmail={handleOnChangeEmail} 
        password={password}
        handleOnChangePassword={handleOnChangePassword}
      />

      <Button 
        modalText={`Don't have an account yet?`} 
        modalLink={'Signup Here!'}
        action={'Login'}
        redirect={'/signup'}
      />

    </div>
  )
}