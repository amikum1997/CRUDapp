import express from 'express';
import expensesController from '../../controller/expensesController';
import authenticateJWT from '../../middleware/AuthValidator';

const expenseRouter = express.Router()

expenseRouter.route('/addNewTnx').post(authenticateJWT as any ,expensesController.addNewTransaction as any)
expenseRouter.route('/addNewCategory').post(authenticateJWT as any , expensesController.createCategory as any)
expenseRouter.route('/allCategory').get(authenticateJWT as any , expensesController.getAllCategory as any)
expenseRouter.route('/allExpense').get(authenticateJWT as any , expensesController.getAllTransaction as any)
expenseRouter.route('/editExpense').put(authenticateJWT as any , expensesController.editTransaction as any)
expenseRouter.route('/deleteExpense').delete(authenticateJWT as any , expensesController.deleteTransaction as any)
expenseRouter.route('/dashbaordDetail').get(authenticateJWT as any , expensesController.dashboardDetail as any)

export default expenseRouter;
