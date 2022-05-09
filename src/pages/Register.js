import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { registerInitiate } from '../redux/actions';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';

const Register = () => {

    const [state, setState] = useState({
        displayName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })
    const[error, setError] = useState(false);
    const[passwordVisible,setPasswordVisible] = useState({
        password:false,
        confirmPassword:false
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
            setError(true);
            setState({...state, password:"",passwordConfirm:""});
            return
        }
        setError(false);
        dispatch(registerInitiate(email, password, displayName));
        setState({email:"",displayName:"", password:"",passwordConfirm:""});
    }

    const handleChange = (e) => {
        let {name, value} = e.target;
        setState({...state,[name]:value});
    }

    return (
        <div className='register__container'>
            <div id="register-form">
                <form className="form-signup" onSubmit={handleSubmit}>
                    <h1>
                        Sign Up
                    </h1>
                    <div className='form__inputContainer'>
                        <div className="form__searchContainer">
                            <PersonIcon/>
                            <input 
                                type="text"
                                id="displayName"
                                className='form-control'
                                placeholder='Full name'
                                name='displayName'
                                onChange={handleChange}
                                value={displayName}
                                required
                            />
                        </div>
                    </div>
                    <div className='form__inputContainer'>
                        <div className="form__searchContainer">
                            <EmailIcon/>
                            <input 
                                type="email"
                                id="userEmail"
                                className='form-control'
                                placeholder='Email adress'
                                name='email'
                                onChange={handleChange}
                                value={email}
                                required
                            />
                        </div>
                    </div>
                    <div className='form__inputContainer'>
                        <div className="form__searchContainer">
                            <LockIcon/>
                            <input 
                                type={passwordVisible.password ? "text" : "password"}
                                id="userPassword"
                                className='form-control'
                                placeholder='Password'
                                name='password'
                                onChange={handleChange}
                                value={password}
                                required
                            />
                            {passwordVisible.password ?
                             <Visibility onClick={()=>setPasswordVisible({...passwordVisible, password:false})}/> 
                             : <VisibilityOff onClick={()=>setPasswordVisible({...passwordVisible, password:true})}/>
                            }
                        </div>
                    </div>
                    <div className='form__inputContainer'>
                        <div className="form__searchContainer">
                            <LockIcon/>
                            <input 
                                type={passwordVisible.passwordConfirm ? "text" : "password"}
                                id="inputPassword"
                                className='form-control'
                                placeholder='Confirm password'
                                name='passwordConfirm'
                                onChange={handleChange}
                                value={passwordConfirm}
                                required
                            />
                            {passwordVisible.passwordConfirm ? 
                            <Visibility onClick={()=>setPasswordVisible({...passwordVisible, passwordConfirm:false})}/>
                             : <VisibilityOff onClick={()=>setPasswordVisible({...passwordVisible, passwordConfirm:true})}/> }
                        </div>
                    </div> 
                    <div className='form-alert'>
                        {error ? <p>Please make sure your password match</p> : <p></p>}
                    </div>
                    <div className='form-btn__container'>
                        <button className='btn signin-btn' type='submit'>
                          Sign Up
                        </button>
                    </div>
                    <div className='form-signUp__container'>
                        <p>Already have an account?</p>
                        <Link to='/login'>
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register