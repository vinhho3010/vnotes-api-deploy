import express from 'express'
import authController from '../controllers/authController.js';

const AuthRouter = express.Router();

AuthRouter.route("/login")
    .post(authController.login);

AuthRouter.route("/register")
    .post(authController.register);

AuthRouter.route("/logout")
    .get(authController.logout);

AuthRouter.route("refreshtoken")
    .get(authController.refreshToken);

export default AuthRouter;