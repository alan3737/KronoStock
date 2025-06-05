import pool from './pool.js';
import dotenv from 'dotenv';
dotenv.config();

const SQL = `
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        product_name TEXT,
        product_image TEXT,
        time_added TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        company_name TEXT,
        company_logo TEXT
    );

    CREATE TABLE IF NOT EXISTS listings(
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        company_id INTEGER REFERENCES companies(id),
        price DECIMAL(10, 2),
        availibility BOOLEAN,
        url TEXT,
        sku TEXT,
        time_updated TIMESTAMP DEFAULT NOW()
    );

    CREATE OR REPLACE FUNCTION time_updated_automatically()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.time_updated := NOW();
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER set_time_updated
    BEFORE UPDATE ON listings
    FOR EACH ROW
    EXECUTE FUNCTION time_updated_automatically();
`

async function main(){
  await pool.connect();
  await pool.query(SQL);
}

main();