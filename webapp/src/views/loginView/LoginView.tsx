import { Link } from 'react-router-dom';
import './loginView.scss';
import { Form } from '../../components/formComponent/Form';

export const LoginView = () => {
  return (
    <div className='login-container'>

      <Form displayUsername={false} />

      <div className='button-container'>
        <button className='login-button'>Login</button>
        <p className='signup'>Don't have an account? <Link to={"/signup"} className='signup-link'>Signup here!</Link> </p>
      </div>

    </div>
  )
}
