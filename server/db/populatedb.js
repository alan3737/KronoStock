import dotenv from 'dotenv';
dotenv.config();

console.log(`DEBUG: process.env.DB_PASSWORD value: "${process.env.DB_PASSWORD}"`);
import pool from './pool.js';


const SQL = `
    TRUNCATE TABLE listings, products, companies cascade;
    Drop table listings;
    Drop table companies;
    Drop table products;
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        product_name TEXT,
        product_image TEXT,
        description TEXT,
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
        CONSTRAINT unique_product_company_listing UNIQUE (product_id, company_id)
    );

    INSERT INTO products (product_name, product_image, demand)
    VALUES ('switch 2', 'http://localhost:3000/logo4.jpg', 'high');
    INSERT INTO products (product_name, product_image, demand)
    VALUES ('water', 'http://localhost:3000/logo5.jpg', 'low');

    INSERT INTO companies (company_name, company_logo_url)
    VALUES ('ebay', 'http://localhost:3000/logo2.png');
    INSERT INTO companies (company_name, company_logo_url)
    VALUES ('best buy', 'http://localhost:3000/logo3.png');

    INSERT INTO listings (product_id, company_id, price, availability, url)
    VALUES (1, 1, 20.99, false, 'http://ebay.com');
    INSERT INTO listings (product_id, company_id, price, availability, url)
    VALUES (2, 1, 10.99, true, 'http://ebay.com');
    
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