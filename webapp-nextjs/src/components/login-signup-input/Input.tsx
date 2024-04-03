import React from 'react'

interface InputProps {
    username?: string, 
    handleOnChangeUsername?: React.ChangeEventHandler<HTMLInputElement>,
    email: string, 
    handleOnChangeEmail: React.ChangeEventHandler<HTMLInputElement>,
    password: string, 
    handleOnChangePassword: React.ChangeEventHandler<HTMLInputElement>
}

export const Input: React.FC<InputProps> = (
    { username, handleOnChangeUsername, email, handleOnChangeEmail, password, handleOnChangePassword }
) => {

  return (
    <>
      { username !== undefined && handleOnChangeUsername !== undefined && (
        <input 
          className='w-full p-3 mb-3 border-1 border-slate-200 rounded border-solid bg-slate-200
           text-gray-500 transition-colors outline-none hover:border-1 hover:border-sky-500 cursor-pointer'
          type='text'
          placeholder='Username'
          onChange={(e) => handleOnChangeUsername(e)}
          value={username}
        />
      )}

      <input 
        className='w-full p-3 mb-3 border-1 border-slate-200 rounded bg-slate-200 text-gray-500
         outline-none hover:border-1 hover:border-sky-500 cursor-pointer'
        type='email'
        placeholder='Email'
        onChange={(e) => handleOnChangeEmail(e)}
        value={email}
      />

      <input
        className='w-full p-3 mb-3 border-1 border-slate-200 rounded border-solid bg-slate-200
         text-gray-500 transition-colors outline-none hover:border-1 hover:border-sky-500 cursor-pointer'
        type='password'
        placeholder='Password'
        onChange={(e) => handleOnChangePassword(e)}
        value={password}
      />
    </>
  )
}
