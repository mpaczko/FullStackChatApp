import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { ChatOutlined, OpenWith } from '@material-ui/icons';
import { auth, provider } from './firebase';

const Login = () => {

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => console.log(result))
        .catch(error => alert(error.message));

    }

    return (
        <div className='login'>
            <div className="login__container">
                <img src="https://cdn.pixabay.com/photo/2021/05/22/11/38/whatsapp-6273368_1280.png" alt=""/>
                <div className="login__text">
                    <h1>Sign in</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login