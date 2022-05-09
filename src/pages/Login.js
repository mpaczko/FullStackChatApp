import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { googleSignInInitiate, loginInitiate, fbSignInInitiate } from '../redux/actions';
import { IconButton} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';

const Login = () => {


    const [state, setState] = useState({
        email: "",
        password: ""
    })
    // const[error, setError] = useState(true);
    const[passwordVisible,setPasswordVisible] = useState(false);

    const {email, password} = state;

    const {currentUser} = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser){
            navigate('/');
        }
        console.log(currentUser)
    }, [currentUser, navigate])
    
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password){
            return
        }
        dispatch(loginInitiate(email, password));
        setState({email:"", password:""});
    }

    const handleChange = (e) => {
        let {name, value} = e.target;
        setState({...state,[name]:value});
    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInInitiate());
    }

    const handleFacebookSignIn = () => {
        dispatch(fbSignInInitiate());
    }

    return (
        <div className='login__container'>
            <div id="logreg-form">
                <form className="form-signin" onSubmit={handleSubmit}>
                    <h1>
                        Sign In
                    </h1>
                    <div className='form__inputContainer'>
                        <div className="form__searchContainer">
                            <EmailIcon/>
                            <input 
                                type="email"
                                id="inputEmail"
                                className='form-control'
                                placeholder='Email adress'
                                name='email'
                                onChange={handleChange}
                                value={email}
                                required/>
                        </div>
                    </div>
                    <div className='form__inputContainer'>
                        <div className="form__searchContainer">
                            <LockIcon/>
                            <input 
                                type={passwordVisible ? "text" : "password"}
                                id="inputPassword"
                                className='form-control'
                                placeholder='Password'
                                name='password'
                                onChange={handleChange}
                                value={password}
                                required/>
                            {passwordVisible ?
                             <Visibility onClick={()=>setPasswordVisible(false)}/> 
                             : <VisibilityOff onClick={()=>setPasswordVisible(true)}/>
                            }
                        </div>
                    </div>
                    {/* <div className='form-alert'>
                        {error ? <p>Incorrect email or password</p> : <p></p>}
                    </div> */}
                    <div className='form-btn__container'>
                        <button className='btn signin-btn' type='submit'>
                          Sign in
                        </button>
                    </div>
                    <div className='form-signUp__container'>
                        <p>Don't have an account?</p>
                            <Link to='/register'>
                                Sign up
                            </Link>
                    </div>
                </form>
                <div className='social-login'>
                        <div className='social-login__box'>
                            Sign in with:
                        </div>
                        <div className='social-login__box'>
                            <IconButton onClick={handleGoogleSignIn}>
                                <span >G</span>
                                <span>o</span>
                                <span>o</span>
                                <span>g</span>
                                <span>l</span>
                                <span>e</span>
                            </IconButton>
                            <IconButton onClick={handleFacebookSignIn}>
                                <span>Facebook</span>
                            </IconButton>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Login