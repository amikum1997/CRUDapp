import express from 'express';
import authController from '../../controller/authController';


const authRouter = express.Router()

authRouter.route('/login').post(authController.login as any)
authRouter.route('/register').post(authController.register as any)

export default authRouter;
