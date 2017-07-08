import React from 'react';

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const redirect = window.location.origin + '/login/callback';
const loginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect}`;

const Login = () => (
    <div>
        <a href={loginUrl}>
            Login!
        </a>
    </div>
);

export default Login;
