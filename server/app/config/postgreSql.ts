import { Pool } from 'pg';
import environment from './environment';


const pool = new Pool({
  user: environment.DB_USERNAME,
  host: environment.DB_HOST,
  database: environment.DB_NAME,
  password: environment.DB_PASSWORD,
  port: Number(environment.DB_PORT) || 5432,
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};


const firstTimeUserSetup = async () => {
  try {
    // Check if 'users' table exists
    const userTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);

    // Create 'users' table if it doesn't exist
    if (!userTableExists.rows[0].exists) {
      await pool.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          userName VARCHAR(50) NOT NULL,
          userEmail VARCHAR(100) NOT NULL UNIQUE,
          userPassword VARCHAR(100) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }

    // Check if 'categories' table exists
    const categoryTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'categories'
      );
    `);

    // Create 'categories' table if it doesn't exist
    if (!categoryTableExists.rows[0].exists) {
      await pool.query(`
        CREATE TABLE categories (
          id SERIAL PRIMARY KEY,
          categoryName VARCHAR(50) NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }

    // Check if 'expenses' table exists
    const expenseTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'expenses'
      );
    `);

    // Create 'expenses' table if it doesn't exist
    if (!expenseTableExists.rows[0].exists) {
      await pool.query(`
        CREATE TABLE expenses (
          id SERIAL PRIMARY KEY,
          amount FLOAT NOT NULL,
          description VARCHAR(255) NOT NULL,
          date TIMESTAMP NOT NULL,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }

    // Create trigger function and triggers if not exist
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_timestamp') THEN
          CREATE TRIGGER update_users_timestamp
          BEFORE UPDATE ON users
          FOR EACH ROW
          EXECUTE FUNCTION update_timestamp();
        END IF;
      END $$;

      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_categories_timestamp') THEN
          CREATE TRIGGER update_categories_timestamp
          BEFORE UPDATE ON categories
          FOR EACH ROW
          EXECUTE FUNCTION update_timestamp();
        END IF;
      END $$;

      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_expenses_timestamp') THEN
          CREATE TRIGGER update_expenses_timestamp
          BEFORE UPDATE ON expenses
          FOR EACH ROW
          EXECUTE FUNCTION update_timestamp();
        END IF;
      END $$;
    `);

  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

export { pool, query , firstTimeUserSetup };
