import { pool } from "../config/postgreSql";


export interface Category {
    id: number;
    categoryName: string;
}


const CategoryDBActions = {
    async createCategory(categoryName: string): Promise<Category> {
        const result = await pool.query('INSERT INTO categories (categoryname) VALUES ($1) RETURNING *', [categoryName]);
        return result.rows[0];
    },

    async getAllCategories(): Promise<Category[]> {
        const result = await pool.query('SELECT * FROM categories');
        return result.rows;
    },
}

export default CategoryDBActions;