import './signupView.scss';

import { useState } from 'react';
import { Button } from '../../components/login-signup-button/Button';
import { Input } from '../../components/login-signup-input/Input';

export const SignupView = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleOnChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    return (

    <div className='signup-container'>

        <Input
          username={username}
          handleOnChangeUsername={handleOnChangeUsername}
          email={email} 
          handleOnChangeEmail={handleOnChangeEmail} 
          password={password}
          handleOnChangePassword={handleOnChangePassword}
        />

        <Button 
          modalText={'Already have an account?'} 
          modalLink={'Login Here!'} 
          action={'Sign Up'}
          redirect={'/'}
        />

    </div>
    )
}
