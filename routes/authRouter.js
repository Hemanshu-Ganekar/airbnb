const express = require('express');
const authRouter = express.Router();

//local imports
const authController = require('../controllers/authController');

authRouter.get("/login",authController.getLogin);
authRouter.post('/login',authController.postLogin);
authRouter.get("/logout",authController.getLogOut);
authRouter.get('/signup',authController.getSignUp);
authRouter.post('/signup',authController.postSignUp);
exports.authRouter = authRouter;