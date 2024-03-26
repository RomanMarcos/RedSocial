import './button.scss';
import { Link } from 'react-router-dom';

interface ButtonProps {
    modalText: string; 
    modalLink: string;
    action: string;
    redirect: string,
}

export const Button: React.FC<ButtonProps> = ({ modalText, modalLink, action, redirect }) => {
  return (
    <div className='button-container'>
        <button className='button'> {action} </button>
        <p className='login-signup'> {modalText} <Link to={redirect} className='login-signup-link'> {modalLink} </Link> </p>
    </div>
  )
}
