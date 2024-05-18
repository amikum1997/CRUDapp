import jwt from 'jsonwebtoken';
import UserDBActions from '../dbActions/userActions';
import { INext, IRequest, IResponse } from '../interface/vendors';
import { GeneralError } from '../error/errorConstants';


const authenticateJWT = (req: IRequest, res: IResponse, next: INext) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(403).send(GeneralError.UNAUTHORIZED_ACCESS);
        }

        jwt.verify(token, process.env.JWT_SECRET as string, async (err, decoded) => {
            if (err) {
                return res.status(403).send(GeneralError.UNAUTHORIZED_ACCESS);
            }

            const user = await UserDBActions.getUserByEmail((decoded as any).email);
            if (!user) {
                return res.status(403).send(GeneralError.UNAUTHORIZED_ACCESS);
            }

            req.user = user;
            next();
        });
    } catch (error) {
        next(error)
    }
};

export default authenticateJWT;