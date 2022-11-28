const express = require('express');
const authRouter = express.Router()
const Auth = require('../../controller/auth/auth');

authRouter.get('/me', Auth.getLoginUser);
authRouter.post('/login',Auth.loginUser);
authRouter.delete('/logout', Auth.logoutUser);


module.exports = authRouter


