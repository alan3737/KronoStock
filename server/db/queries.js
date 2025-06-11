import pool from './pool.js';

export async function getAllProductsThatStartWithKeyword(keyword){
    const result = await pool.query("SELECT id, product_name, product_image FROM products WHERE product_name ILIKE $1 ORDER BY product_name LIMIT 10", [keyword + '%']);
    return result.rows;
}
export async function getAllProductsFromCompanyWithDemand(companyName, demand){
    const result = await pool.query("SELECT listings.id, listings.price, products.product_name, products.category_id, products.epid, listings.availability FROM listings JOIN products ON listings.product_id = products.id JOIN companies ON listings.company_id = companies.id WHERE companies.company_name = $1 AND products.demand = $2", [companyName, demand]);
    return result.rows;
}

export async function updateProductPrice(id, price){
    await pool.query(`UPDATE listings SET price = $1 WHERE id = $2`, [price, id]);
}

export async function updateProductPriceAndAvailability(id, price, availability){
    await pool.query(`UPDATE listings SET price = $1, availability = $2 WHERE id = $3`, [price, availability, id])
}

export async function updateProductAvailability(id, availability){
    await pool.query(`UPDATE listings SET availability = $1 WHERE id = $2`, [availability, id])
}