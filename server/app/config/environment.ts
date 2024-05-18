import path from 'path'
import dotenv from 'dotenv-safe';

dotenv.config({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
});

const environment = {
     PORT : process.env.PORT,
     NODE_ENV : process.env.NODE_ENV,
     LOGS : process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
     jwtSecret: process.env.JWT_SECRET,
     jwtExpirationInterval: process.env.JWT_EXPIRATION,
}

export default environment