import express from 'express';
import authController from '../../controller/authController';


const authRouter = express.Router()

authRouter.route('/login').get(authController.login)
authRouter.route('/register').get(authController.register)

export default authRouter;
