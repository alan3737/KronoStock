import pool from './pool.js';

export async function getAllProductsThatStartWithKeyword(keyword){
    const result = await pool.query("SELECT * FROM listings JOIN products ON listings.product_id = products.id JOIN companies ON listings.company_id = companies.id WHERE product_name LIKE $1 ORDER BY product_name", [keyword + '%']);
    return result.rows;
}


export async function getTopProducts(count) {
    const result = await pool.query("SELECT p.id , p.name, p.image_url as url, l.availability, l.price FROM listing l JOIN products p ON listing.product_id = product.id where availability = 'IN_STOCK' ORDER BY listing.add_time DESC LIMIT $1", [count]);
    return result.rows;
}

//todo: include a mapping helper function to return consistent format
export async function getProductDetails(id) {
    const result = await pool.query("SELECT p.id as productID, p.name as productName, p.image_url as productImageUrl, c.id as companyID, c.name as companyName, c.logo_url as companyLogoUrl, l.url as listingUrl, l.last_available as lastAvailable, l.price, l.availability, l.id as listingID  FROM listings l JOIN products p ON l.product_id = p.id JOIN companies c on l.company_id = c.id where l.product_id = $1", [id]);
    return result.rows;
}