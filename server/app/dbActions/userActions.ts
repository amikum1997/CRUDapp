import { pool } from "../config/postgreSql";
import bcrypt from 'bcryptjs';
import { User } from "../interface/dbInterface/users";

const UserDBActions = {
    async getUserByEmail(userEmail: string): Promise<User | null> {
        const result = await pool.query('SELECT * FROM users WHERE useremail = $1', [userEmail]);
        return result.rows[0];
    },
    async createUser(userName: string, userEmail: string, userPassword: string): Promise<User> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);
        const result = await pool.query(
            'INSERT INTO users (username, useremail, userpassword) VALUES ($1, $2, $3) RETURNING *',
            [userName, userEmail, hashedPassword]
        );
        return result.rows[0];
    },
    async comparePassword(user: User, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.userpassword);
    }
}

export default UserDBActions;