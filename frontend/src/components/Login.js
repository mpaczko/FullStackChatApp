import React from 'react';
import '../styles/Login.css';
import { Button } from '@material-ui/core';
import { ChatOutlined, OpenWith } from '@material-ui/icons';
import { auth, provider } from '../firebase';
import { useStateValue } from '../useReducer/StateProvider';
import { actionTypes } from '../useReducer/reducer';
import SignIn from './Signup';

const Login = () => {


    return (
        <div className='login'>
            <div className="login__container">
                <img src="https://cdn.pixabay.com/photo/2021/05/22/11/38/whatsapp-6273368_1280.png" alt=""/>
                <div className="login__text">
                    <h1>Sign in</h1>
                </div>
                <Button>
                    Sign in with Google
                </Button>
            </div>
            <SignIn/>
        </div>
    )
}

export default Login