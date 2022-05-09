import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { registerInitiate } from '../redux/actions';

const Register = () => {

    const [state, setState] = useState({
        displayName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })
    const {email, password,displayName, passwordConfirm} = state;

    const {currentUser} = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser){
            navigate('/');
        }
    }, [currentUser, navigate])
    
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password!==passwordConfirm){
            return
        }
        dispatch(registerInitiate(email, password, displayName));
        setState({email:"",displayName:"", password:"",passwordConfirm:""});
    }

    const handleChange = (e) => {
        let {name, value} = e.target;
        setState({...state,[name]:value});
    }

    return (
        <div>
            <div id="register-form">
                <form className="form-signup" onSubmit={handleSubmit}>
                    <h1>
                        Sign Up
                    </h1>
                    <input 
                        type="text"
                        id="displayName"
                        className='form-control'
                        placeholder='Full Name'
                        name='displayName'
                        onChange={handleChange}
                        value={displayName}
                        required
                    />
                    <input 
                        type="email"
                        id="userEmail"
                        className='form-control'
                        placeholder='Email Adress'
                        name='email'
                        onChange={handleChange}
                        value={email}
                        required
                    />
                    <input 
                        type="password"
                        id="userPassword"
                        className='form-control'
                        placeholder='password'
                        name='password'
                        onChange={handleChange}
                        value={password}
                        required
                    />
                    <input 
                        type="password"
                        id="inputPassword"
                        className='form-control'
                        placeholder='password confirm'
                        name='passwordConfirm'
                        onChange={handleChange}
                        value={passwordConfirm}
                        required
                    />
                        <button className='btn signin-btn' type='submit'>
                          Sign Up
                        </button>
                        <p>Already have an account</p>
                        <Link to='/login'>
                            Sign in
                        </Link>
                </form>
            </div>
        </div>
    )
}

export default Register