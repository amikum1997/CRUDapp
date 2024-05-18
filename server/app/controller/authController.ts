import moment from "moment-timezone";
import BaseError from "../error/baseError";
import { GeneralError } from "../error/errorConstants";
import { INext, IRequest, IResponse } from "../interface/vendors";
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import environment from "../config/environment";
import UserDBActions from "../dbActions/userActions";

const authController = {
    login: async (req: IRequest, res: IResponse, next: INext) => {
        const { userEmail, userPassword } = req.body;
        try {
            const user = await UserDBActions.getUserByEmail(userEmail);
            console.log(user);

            if (!user) {
                throw new BaseError(GeneralError.NO_ACCOUNT_EXIST)
            }

            if(!(await UserDBActions.comparePassword(user, userPassword))){
                new BaseError(GeneralError.PASSWORD_MISSMATCHED)
            }

            const token = jwt.sign({ id: user?.id, email: user?.useremail }, process.env.JWT_SECRET as string, {
                expiresIn: '12h',
            });
            
            let toSendObject = {
                ...user,
                token: token
            }

            return res.status(200).send(toSendObject)
        } catch (error) {
            next(error)
        }
    },
    register: async (req: IRequest, res: IResponse, next: INext) => {
        try {
            const { userName, userEmail, userPassword } = req.body;

            const validateUserExist = await UserDBActions.getUserByEmail(userEmail)
            console.log(validateUserExist);
            
            if(validateUserExist){
                throw new BaseError(GeneralError.EMAIL_ALEADY_EXIST)
            }

            const user = await UserDBActions.createUser(userName, userEmail, userPassword);
            if (!user) {
                new BaseError(GeneralError.SOMETHING_WENT_WRONG)
            }
            return res.status(200).send(user)
        } catch (error) {
            next(error)
        }
    }
}

export default authController;