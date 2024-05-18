import moment from "moment-timezone";
import BaseError from "../error/baseError";
import { GeneralError } from "../error/errorConstants";
import { INext, IRequest, IResponse } from "../interface/vendors";
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import environment from "../config/environment";
import { AuthService } from "../services/authService/authService";


const authController = {
    login: async (req: IRequest, res: IResponse, next: INext) => {
        try {
            let { userEmail, userPassword } = req.body;
            // VERIFY IF USER EXIST
            // let checkDublicateEmail = await User.findOne({ userEmail: { $regex: new RegExp(userEmail, 'i') } })
            // if (!checkDublicateEmail)
            //     throw new BaseError(GeneralError.NO_ACCOUNT_EXIST)

            // IF USER IS BLOCKED
            // if (checkDublicateEmail.isUserBanned) {
            //     throw new BaseError(GeneralError.POLICY_VIOLATION)
            // }

           
            // VALIDATE USER ACCOUNT IS VERIFIED OR NOT
            if (true) {
                // ACTION FOR VERIFIED USER
                // let isPasswordTrue = await bcrypt.compare(userPassword, checkDublicateEmail.userPassword);
             
                // let userAccessToken = await AuthService.generateAccessToken(checkDublicateEmail._id)

                // res.status(200).send({status : 200 , message : "AUTHENTICATION SUCCESSFULL" , data : {userDetail : checkDublicateEmail , accesstoken : userAccessToken , userProfile : userProfile}})
            } else {
                // ACTION FOR NON VERIFIED USER
            }


        } catch (err) {
            next(err)
        }
    },
    register: async (req: IRequest, res: IResponse, next: INext) => {
        try {
            let { userName , userEmail, userPassword } = req.body;

            // CHECK IF USER EMAIL ALREADY EXIST
            // let checkDublicateEmail = await User.findOne({ userEmail: { $regex: new RegExp(userEmail, 'i') } })
            // if (checkDublicateEmail)
            //     throw new BaseError(GeneralError.EMAIL_ALEADY_EXIST)
           
            // REGISTER USER
            // let registerUserPayload = {
            //     userName : userName,
            //     userEmail: userEmail,
            //     userPassword: userPassword,
            // }
            // let registerUser: any = await AuthService.registeruser(registerUserPayload)
            // GENERATE ACCESS TOKEN FOR USER
            // let userAccessToken = await AuthService.generateAccessToken(registerUser._id)
            // RESPONSE IF EVERY THINGS GOES RIGHT
            // res.status(200).send({ status: 200, message: "USER REGISTERED SUCCESSFULLY", data: { userDetail: registerUser, accessToken: userAccessToken } })
        } catch (err) {
            next(err)
        }
    },
}

export default authController;