import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { googleSignInInitiate, loginInitiate, fbSignInInitiate } from '../redux/actions';

const Login = () => {


    const [state, setState] = useState({
        email: "",
        password: ""
    })

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
        <div>
            <div id="logreg-form">
                <form className="form-signin" onSubmit={handleSubmit}>
                    <h1>
                        Sign In
                    </h1>
                    <input 
                        type="email"
                        id="inputEmail"
                        className='form-control'
                        placeholder='Email Adress'
                        name='email'
                        onChange={handleChange}
                        value={email}
                        required/>
                    <input 
                        type="password"
                        id="inputPassword"
                        className='form-control'
                        placeholder='password'
                        name='password'
                        onChange={handleChange}
                        value={password}
                        required/>
                        <button className='btn signin-btn' type='submit'>
                          Sign in
                        </button>
                        <p>Don't have an account</p>
                        <Link to='/register'>
                            Sign up
                        </Link>
                </form>
                <div className='social-login'>
                        <button className='btn google-btn' onClick={handleGoogleSignIn}>
                          Sign in with Google
                        </button>
                        <button className='btn google-btn' onClick={handleFacebookSignIn}>
                          Sign in with Facebook
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default Login