import './input.scss';

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
          className='input'
          type='text'
          placeholder='Username'
          onChange={(e) => handleOnChangeUsername(e)}
          value={username}
        />
      )}

      <input 
        className='input'
        type='email'
        placeholder='Email'
        onChange={(e) => handleOnChangeEmail(e)}
        value={email}
      />

      <input
        className='input'
        type='password'
        placeholder='Password'
        onChange={(e) => handleOnChangePassword(e)}
        value={password}
      />
    </>
  )
}
