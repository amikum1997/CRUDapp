import CategoryDBActions from "../dbActions/categoryActions";
import { INext, IRequest, IResponse } from "../interface/vendors"
import BaseError from "../error/baseError";
import { GeneralError } from "../error/errorConstants";
import ExpenseDBAction from "../dbActions/expenseAction";



const expensesController = {
    createCategory: async (req: IRequest, res: IResponse, next: INext) => {
        try {
            const { categoryName } = req.body;
            let newCategory = await CategoryDBActions.createCategory(categoryName)
            if (!newCategory) {
                throw new BaseError(GeneralError.SOMETHING_WENT_WRONG)
            }
            return res.status(200).send(newCategory)
        } catch (error) {
            next(error)
        }
    },
    getAllCategory: async (req: IRequest, res: IResponse, next: INext) => {
        try {
            let allCategoryData = await CategoryDBActions.getAllCategories();
            return res.status(200).send(allCategoryData)
        } catch (error) {
            next(error)
        }
    },
    getAllTransaction: async (req: IRequest, res: IResponse, next: INext) => {
        const { userID } = req.query;
        try {
            let allTransactionData = await ExpenseDBAction.getExpensesByUserId(userID as any);
            res.status(200).send(allTransactionData)
        } catch (error) {
            next(error)
        }
    },
    addNewTransaction: async (req: IRequest, res: IResponse, next: INext) => {
        const { amount, description, date, type, user_id,category } = req.body
        try {
            let addNewTrx = await ExpenseDBAction.createExpense(amount, description, date, type, user_id,category);
            if (!addNewTrx) {
                throw new BaseError(GeneralError.SOMETHING_WENT_WRONG)
            }

            return res.status(200).send(addNewTrx)
        } catch (error) {
            next(error)
        }
    },
    dashboardDetail: async (req: IRequest, res: IResponse, next: INext) => {
        const { userID } = req.query;
        try {
            let allTransactionData = await ExpenseDBAction.getExpensesByUserId(userID as any);

            if(allTransactionData.length){
                let allCredits: number = allTransactionData.reduce((sum, transaction) => transaction.type === 'credit' ? sum + transaction.amount : sum, 0)
                let allDebits: number = allTransactionData.reduce((sum, transaction) => transaction.type === 'debit' ? sum + transaction.amount : sum, 0)
                let remainingCredits = allCredits - allDebits
                res.status(200).send({
                    currentBalance: remainingCredits,
                    totalIncome: allCredits,
                    totalExpense: allDebits
                })
            }else{
                throw new BaseError(GeneralError.SOMETHING_WENT_WRONG)
            }
         
        } catch (error) {
            next(error)
        }
    }
}

export default expensesController