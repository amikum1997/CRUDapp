import express from 'express';
import expensesController from '../../controller/expensesController';

const expenseRouter = express.Router()

expenseRouter.route('/addNewTnx').post(expensesController.addNewTransaction as any)
expenseRouter.route('/addNewCategory').post(expensesController.createCategory as any)
expenseRouter.route('/allCategory').get(expensesController.getAllCategory as any)
expenseRouter.route('/allExpense').get(expensesController.getAllTransaction as any)
expenseRouter.route('/dashbaordDetail').get(expensesController.dashboardDetail as any)

export default expenseRouter;
