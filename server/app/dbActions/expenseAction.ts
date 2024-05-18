import { pool } from "../config/postgreSql";


export interface Expense {
    id: number;
    amount: number;
    description: string;
    date: Date;
    userId: number;
    categoryId: number;
}

const ExpenseDBAction = {
    async createExpense(amount: number, description: string, date: Date, userId: number, categoryId: number): Promise<Expense> {
        const result = await pool.query(
            'INSERT INTO expenses (amount, description, date, user_id, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [amount, description, date, userId, categoryId]
        );
        return result.rows[0];
    },

    async getExpensesByUserId(userId: number): Promise<Expense[]> {
        const result = await pool.query('SELECT * FROM expenses WHERE user_id = $1', [userId]);
        return result.rows;
    },
}

export default ExpenseDBAction;
