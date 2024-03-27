import './button.scss';
import { Link } from 'react-router-dom';

interface ButtonProps {
    modalText: string; 
    modalLink: string;
    action: string;
    redirect: string,
    validateFiels: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = ({ modalText, modalLink, action, redirect, validateFiels }) => {
  return (
    <div className='button-container'>
        <button className='button' onClick={validateFiels}> {action} </button>
        <p className='login-signup'> {modalText} <Link to={redirect} className='login-signup-link'> {modalLink} </Link> </p>
    </div>
  )
}
