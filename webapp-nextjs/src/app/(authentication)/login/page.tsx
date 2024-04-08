'use client'

import React, { useEffect, useState } from 'react'
import { login, signup } from '../../../services/apiCall'
import { Input } from '../../../components/login-signup-input/Input'
import { Button } from '../../../components/login-signup-button/Button'

import { useRouter } from 'next/navigation';

interface LoginProps {
  username?: string | undefined, 
  handleOnChangeUsername?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

const Login: React.FC<LoginProps> = ({ username, handleOnChangeUsername }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [newUserError, setNewUserError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) router.push('/dashboard');
  }, []);

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const validateFields = async () => {

    const usernameRegex = /^(?=.*[A-Z]).{6,8}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/;

    if (username !== undefined) {
      if (!usernameRegex.test(username)) {
        setUsernameError(true);
        clearErrorMessageAfterDelay();
      }
    }
  
    if (!emailRegex.test(email)) {
      setEmailError(true);
      clearErrorMessageAfterDelay();
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      clearErrorMessageAfterDelay();
    }

    if ( emailRegex.test(email) && passwordRegex.test(password) && username === undefined ) {
      const { token, user } = await login(email, password);

      if (token && user) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', user[0]._id);
        router.push('/dashboard');
      } else {
        setLoginError(true);
        clearErrorMessageAfterDelay();
      }
      
    }

    if ( username && emailRegex.test(email) && passwordRegex.test(password) && usernameRegex.test(username) ) {
      const { token } = await signup(username, email, password);

      if (token) {
        router.push('/login');
      } else {
        setNewUserError(true);
        clearErrorMessageAfterDelay();
      }

    }

  }

  const clearErrorMessageAfterDelay = () => {
    setTimeout(() => {
      setUsernameError(false);
      setEmailError(false);
      setPasswordError(false);
      setNewUserError(false);
      setLoginError(false);
    }, 8000);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className='flex flex-col items-center justify-center text-base p-5 shadow-md rounded w-60 m-0 bg-white sm:w-80'>

        <Input
          username={username !== undefined ? username : undefined}
          handleOnChangeUsername={handleOnChangeUsername}
          email={email} 
          handleOnChangeEmail={handleOnChangeEmail}
          password={password}
          handleOnChangePassword={handleOnChangePassword}
        />
        <Button 
          modalText={(username === undefined) ? `Don't have an account yet?` : `Already have an account?`} 
          modalLink={(username === undefined) ? 'Signup Here!' : 'Login Here!'}
          action={(username === undefined) ? 'Login' : 'Signup'}
          redirect={(username === undefined) ? '/signup' : '/'}
          validateFields={validateFields}
        />

        { loginError && ( <p className='text-red-700 m-0 text-sm text-center'>- Oops.. There was an error with the login, please try again later.</p> ) }
        { newUserError && ( <p className='text-red-700 m-0 text-sm text-center'>- There was an error trying to create your user.. Please try again later.</p> ) }

        { usernameError && ( <p className='text-red-700 m-0 text-sm text-center'>- Username must be 6 to 8 characters long and include at least one capital letter.</p> ) }
        { emailError && (
          <p className='text-red-700 m-0 text-sm text-center'>
            - The email address is not in a valid format. Please ensure it follows the standard email format (e.g., name@example.com).
          </p>
        )}
        { passwordError && ( <p className='text-red-700 m-0 text-sm text-center'>- The password must be 8 to 12 characters long and include at least one symbol.</p> ) }
      </div>
    </div>
  )
}

export default Login