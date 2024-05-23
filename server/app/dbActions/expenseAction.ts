import { pool } from "../config/postgreSql";


export interface Expense {
    id: number;
    amount: number;
    description: string;
    date: Date;
    user_id: number;
    type: string;
    category_id: number;
}

const ExpenseDBAction = {
    async createExpense(amount: number, description: string, date: string, type: string, user_id: number, category: number): Promise<Expense> {
        const result = await pool.query('INSERT INTO expenses (amount, description, date, type ,user_id, category_id) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *', [amount, description, date, type, user_id, category]);
        return result.rows[0];
    },
    async getExpensesByUserId(userId: number): Promise<Expense[]> {
        const result = await pool.query('SELECT expenses.*, categories.categoryname FROM expenses JOIN categories ON expenses.category_id = categories.id WHERE expenses.user_id = $1;', [userId]);
        return result.rows;
    },
    async EditExpenseByUserId(amount: number, description: string, date: string, type: string, category: number , id:number): Promise<Expense[]> {
        const result = await pool.query('UPDATE expenses SET amount=$1 , description=$2 , date=$3 , type=$4, category_id=$5 WHERE id=$6', [amount, description, date, type, category, id]);
        return result.rows;
    },
    async DeleteExpenseByID(id: number, userID: number): Promise<Expense[]> {
        const result = await pool.query('DELETE FROM expenses WHERE id=$1 AND user_id=$2', [id, userID]);
        return result.rows;
    }
}

export default ExpenseDBAction;
