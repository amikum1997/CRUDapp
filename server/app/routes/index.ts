import express from 'express';
import authRouter from './v1/authRouter';
import expenseRouter from './v1/expenseRouter';


const router = express.Router()

// v1 routes
router.get('/status', (req, res) => res.send({status : 'ok'}));
router.use('/auth' , authRouter)
router.use('/expense' , expenseRouter)


export default router;