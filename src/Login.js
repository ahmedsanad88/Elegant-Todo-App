//jshint esversion:6
import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';

const Login = () => {

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(() => alert("login successfully."))
        .catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__telegram">
                <img src="./src/Logo.png" alt="icon" />
                <h1>Sanad-Keeper</h1>
                <small>ToDo Note Web-App</small>
            </div>
            <Button onClick={signIn}>Sign In With <img className="google__img" src="https://img.utdstc.com/icon/207/754/20775446e3be597100aec56474bea69fc9e64d29e5cb3aa84d93f50462cc108c:200" alt="Google-icon" /></Button>
        </div>
    )
}

export default Login;