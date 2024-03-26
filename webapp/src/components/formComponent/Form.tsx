import './form.scss';

interface FormProps {
    displayUsername: boolean;
}

export const Form: React.FC<FormProps> = ({ displayUsername }) => {
  return (
    <>
        { displayUsername && (
            <input 
            className='input'
            type='text'
            placeholder='Username'
            />
        ) }

        <input 
        className='input'
        type='email'
        placeholder='Email'
        />

        <input
        className='input'
        type='password'
        placeholder='Password'
        />
    </>
  )
}
