import express from 'express';
import authRouter from './v1/authRouter';


const router = express.Router()

// v1 routes
router.get('/status', (req, res) => res.send({status : 'ok'}));
router.use('/auth' , authRouter)


export default router;