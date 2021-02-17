import React from 'react';

function Login() {
    return(
        <div className='App'>
            <h1>Welcome to the Meet App</h1>
            <h4>
                Login to see upcoming events around the world for full-stack developer
            </h4>
            <div className='button_cont' align='center'>
                <div class='google-btn'>
                    <div class='google-icon-wrapper'>
                        <img class="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="Google sign-in"
                        />
                    </div>
                    <a href="https://xixfiq7och.execute-api.ca-central-1.amazonaws.com/dev/api/get-auth-url" rel='nofollow noopener' class='btn-text'>
                        <b>Sign in with Google</b>
                    </a>
                </div>
            </div>
            <a href='https://KSFlynn007.github.io/meet-app/privacy.html' rel='nofollow noopener'>
                Privacy Policy
            </a>
        </div>
    );
}

export default Login;