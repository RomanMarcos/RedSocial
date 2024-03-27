import { useState } from 'react';
import { LoginView } from '../loginView/LoginView';

export const SignupView = () => {

    const [username, setUsername] = useState('');

    const handleOnChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    return (
        <LoginView username={username} handleOnChangeUsername={handleOnChangeUsername} />
    )
}
