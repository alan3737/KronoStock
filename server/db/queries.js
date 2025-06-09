import pool from './pool.js';

export async function getAllProductsThatStartWithKeyword(keyword){
    const result = await pool.query("SELECT id, product_name, product_image FROM products WHERE product_name ILIKE $1 ORDER BY product_name LIMIT 10", [keyword + '%']);
    return result.rows;
}
export async function getAllProductsFromCompany(companyName){
    const result = await pool.query("SELECT id, product_name, category_id, epid, availability, price FROM listings JOIN products ON listings.product_id = products.id JOIN companies ON listings.company_id = companies.id WHERE company_name = $1", [companyName]);
    return result.rows;
}