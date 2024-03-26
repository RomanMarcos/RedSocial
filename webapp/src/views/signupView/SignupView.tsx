import { Form } from '../../components/formComponent/Form';
import './signupView.scss';
import { Link } from 'react-router-dom'

export const SignupView = () => {
    return (
    <div className='signup-container'>

        <Form displayUsername={true} />

        <div className='button-container'>
            <button className='signup-button'>Signup</button>
            <p className='signup'>Already have an account? <Link to={"/"} className='login-link'>Login here!</Link> </p>
        </div>

    </div>
    )
}
