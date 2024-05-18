import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import BaseError from "../../error/baseError";
import { GeneralError } from "../../error/errorConstants";
import moment from "moment";
import environment from "../../config/environment";

export const AuthService = {

    async registeruser(payload: any) {
        const salt = await bcrypt.genSalt(10);
        let userEncryptedPassword = await bcrypt.hash(payload.userPassword, salt);
        let registerUserPayload = {
            userEmail: payload.userEmail,
            userPassword: userEncryptedPassword,
            phoneNumber: payload.phoneNumber,
            countryCode: payload.countryCode
        }

        // let registerUser = await new User(registerUserPayload).save()

        // if (!registerUser)
        //     throw new BaseError(GeneralError.SOMETHING_WENT_WRONG)

        // return registerUser;
    },
    
    async generateAccessToken(_id: any) {
        const payload = {
            exp: moment().add(environment.jwtExpirationInterval, 'hours').unix(),
            iat: moment().unix(),
            sub: _id,
        };
        const expires = moment().add(environment.jwtExpirationInterval, 'hours').toDate();
        const token = jwt.sign(payload, environment.jwtSecret as string)
        const data = {
            token: token,
            expiry: String(expires)
        }
        // let updateUserAccessToken = await UserSession.findByIdAndUpdate(_id, { accessToken: data } ,{new : true , upsert : true})
        // if(!updateUserAccessToken)
        //     throw new BaseError(GeneralError.SOMETHING_WENT_WRONG)

        return data;
    }
}