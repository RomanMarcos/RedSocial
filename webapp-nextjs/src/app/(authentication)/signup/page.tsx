'use client'
import { useState } from 'react';
import Login from '../login/page';

const Signup = () => {

    const [username, setUsername] = useState('');

    const handleOnChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    return (
        <Login username={username} handleOnChangeUsername={handleOnChangeUsername} />
    )
}

export default Signup