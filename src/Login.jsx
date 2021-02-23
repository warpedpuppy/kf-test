import React from 'react';
import Config from './config'

function Login() {
    return (
        <div className='App'>
            <h1>Welcome to the Meet App</h1>
            <h4>
                Log in to see upcoming events around the world for full-stack developers
            </h4>
            <div className='button_cont' align='center'>
                <div className='google-btn'>
                    <div className='google-icon-wrapper'>
                        <img
                        className='google-icon'
                        src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                        alt='Google sing-in'
                        />
                    </div>
                    <a
                    href={Config.GET_AUTH}
                    rel='nofollow noopener'
                    className='btn-text'
                    >
                        <b>Sign in with Google</b>
                    </a>
                </div>
            </div>
            <a
            href='https://glenzy.github.io/meet/privacy.html'
            rel='nofollow noopener'
            >
                Privacy Policy
            </a>
        </div>
    );
}

export default Login;