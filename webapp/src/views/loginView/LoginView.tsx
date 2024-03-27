import './loginView.scss';

import { useState } from 'react';
import { Button } from '../../components/login-signup-button/Button';
import { Input } from '../../components/login-signup-input/Input';

interface LoginProps {
  username?: string | undefined, 
  handleOnChangeUsername?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export const LoginView: React.FC<LoginProps> = ({ username, handleOnChangeUsername }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const validateFiels = () => {

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

  }

  const clearErrorMessageAfterDelay = () => {
    setTimeout(() => {
      setUsernameError(false);
      setEmailError(false);
      setPasswordError(false);
    }, 8000);
  }

  return (
    <div className='login-container'>

      <Input
        username={username === '' ? username : undefined}
        handleOnChangeUsername={handleOnChangeUsername}
        email={email} 
        handleOnChangeEmail={handleOnChangeEmail}
        password={password}
        handleOnChangePassword={handleOnChangePassword}
      />
      <Button 
        modalText={username !== '' ? `Don't have an account yet?` : `Already have an account?`} 
        modalLink={username !== '' ? 'Signup Here!' : 'Login Here!'}
        action={username !== '' ? 'Login' : 'Signup'}
        redirect={username !== '' ? '/signup' : '/'}
        validateFiels={validateFiels}
      />

      { usernameError && ( <p className='error-message'>- Username must be 6 to 8 characters long and include at least one capital letter.</p> ) }

      { emailError && (
        <p className='error-message'>
          - The email address is not in a valid format. Please ensure it follows the standard email format (e.g., name@example.com).
        </p>
      )}

      { passwordError && ( <p className='error-message'>- The password must be 8 to 12 characters long and include at least one symbol.</p> ) }
      
    </div>
  )
}