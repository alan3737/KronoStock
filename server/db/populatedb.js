import dotenv from 'dotenv';
dotenv.config();

console.log(`DEBUG: process.env.DB_PASSWORD value: "${process.env.DB_PASSWORD}"`);
import pool from './pool.js';


const SQL = `

    TRUNCATE TABLE products;
    TRUNCATE TABLE companies;
    TRUNCATE TABLE listings;

    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        product_name TEXT,
        product_image TEXT,
        demand TEXT,
        category_id TEXT,
        epid TEXT,
        time_added TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        company_name TEXT,
        company_logo_url TEXT
    );

    CREATE TABLE IF NOT EXISTS listings(
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        company_id INTEGER REFERENCES companies(id),
        price DECIMAL(10, 2),
        availability BOOLEAN,
        url TEXT,
        time_updated TIMESTAMP DEFAULT NOW()
    );

    INSERT INTO products (product_name, product_image_url)
    VALUES ('soda', 'soda.com');
    INSERT INTO products (product_name, product_image_url)
    VALUES ('water', 'water.com');

    INSERT INTO companies (company_name, company_logo_url)
    VALUES ('ebay', 'ebay.com/logo');
    INSERT INTO companies (company_name, company_logo_url)
    VALUES ('best buy', 'bestbuy.com/logo');

    INSERT INTO listings (product_id, company_id, price, availability, url, sku)
    VALUES (1, 1, 20.99, FALSE, 'soda.com/product', 'abc');
    INSERT INTO listings (product_id, company_id, price, availability, url, sku)
    VALUES (1, 2, 10.99, FALSE, 'water.com/product', 'cba');
    
    CREATE OR REPLACE FUNCTION time_updated_automatically()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.time_updated := NOW();
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE OR REPLACE TRIGGER set_time_updated
    BEFORE UPDATE ON listings
    FOR EACH ROW
    EXECUTE FUNCTION time_updated_automatically();
`

async function main(){
  
  await pool.connect();
  await pool.query(SQL);
  console.log("populated");
}

main();