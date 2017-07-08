const express = require('express');
const axios = require('axios');

const router = express.Router();
const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const COOKIE_NAME = process.env.REACT_APP_ACCESS_TOKEN_COOKIE;

router.get('/callback', (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.redirect(`/`);
    }
    const body = {
        client_id: CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code: code,
    };
    const config = {
        headers: {
            accept: 'application/json',
        },
    };
    axios.post(`https://github.com/login/oauth/access_token/`, body, config)
    .then((result) => {
        res.cookie(COOKIE_NAME, result.data.access_token);
        return res.redirect(`/`);
    }).catch((error) => {
        console.log(error.message);
        console.log(error.response.headers);
        return res.redirect(`/`);
    });
});

module.exports = router;
