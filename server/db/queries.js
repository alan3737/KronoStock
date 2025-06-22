import pool from './pool.js';

export async function getAllProductsThatStartWithKeyword(keyword){
    const result = await pool.query("SELECT id, product_name, product_image FROM products WHERE product_name ILIKE $1 ORDER BY product_name LIMIT 10", [keyword + '%']);
    return result.rows;
}


export async function getAllProductsFromCompanyWithDemand(companyName, demand){
    const result = await pool.query("SELECT listings.id, listings.price, products.product_name, products.category_id, products.epid, listings.availability FROM listings JOIN products ON listings.product_id = products.id JOIN companies ON listings.company_id = companies.id WHERE companies.company_name ILIKE $1 AND products.demand = $2", [companyName, demand]);
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

//all unique products and where they are available
export async function getTopProducts(count) {
    const result = await pool.query("SELECT p.id , p.product_name, p.product_image_url as url, EXISTS(SELECT 1 FROM listings l where l.product_id = p.id and availability = true) as availabilitys FROM products p ORDER BY p.time_added DESC LIMIT $1", [count]);
    return result.rows;
}

//todo: include a mapping helper function to return consistent format
export async function getProductDetails(id) {
    const result = await pool.query("SELECT product_name, product_image, company_name, company_logo, time_updated, description, price, availability, url FROM listings JOIN products ON listings.product_id = products.id JOIN companies ON listings.company_id = companies.id WHERE listings.product_id = $1 ORDER BY availability DESC", [id]);
    return result.rows;
}


export async function updateListing(listingData) {
    const rowCounts = await pool.query("");
    return result.rowCounts;
}