import React,{ useRef,useState } from 'react';
import '../styles/Signup.css';
import { Button } from '@material-ui/core';
import { useAuth } from '../useReducer/AuthContext';

const Signup = () => {

   const emailRef = useRef();
   const passwordRef = useRef();
   const passwordConfirmfRef = useRef();
   const { signUp, currentUser } = useAuth();
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);


   async function handleSubmit(e){

       e.preventDefault();

       if(passwordRef.current.value !== passwordConfirmfRef.current.value){
            return setError('password do not match')
       }
       try{
           setError('')
           setLoading(true)
           await signUp(emailRef.current.value, passwordRef.current.value);
       } 
       catch{
           setError('Failed to create an account');
       }
       setLoading(false);

   }

  return (
    <div className="signup">
        <div className='signup__container'>
            <div>
                <h2>Sign up</h2>
            </div>
            {currentUser && currentUser.email}
            { error && <h1>{error}</h1> }
            <form onSubmit={handleSubmit}> 
                <div id='email' className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input  type="email" 
                            ref={emailRef} 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email" 
                            required/>
                </div>
                <div id='password' className="form-group">
                    <label htmlFor="exampleInputPassword2">Password</label>
                    <input type="password" 
                            ref={passwordRef} 
                            className="form-control" 
                            id="exampleInputPassword2" 
                            placeholder="Password" 
                            required/>
                </div>
                <div id='password' className="form-group">
                    <label htmlFor="exampleInputPassword1">Password confirmation</label>
                    <input type="password" 
                            ref={passwordConfirmfRef} 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Password" 
                            required/>
                </div>
                <Button disabled={loading} type='submit' 
                    className='sign-up'>
                    Sign Up
                </Button>
            </form>
            <div>
                Already have an account? Log in
            </div>
        </div>
    </div>
  )
}

export default Signup