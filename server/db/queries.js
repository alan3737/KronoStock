import pool from './pool.js';

export async function getAllProductsThatStartWithKeyword(keyword){
    const result = await pool.query("SELECT id, product_name, product_image FROM products WHERE product_name ILIKE $1 ORDER BY product_name LIMIT 10", [keyword + '%']);
    return result.rows;
}


export async function getAllProductsFromCompanyWithDemand(companyName, demand){
    const result = await pool.query("SELECT listings.id, listings.price, products.product_name, products.category_id, products.epid, listings.availability FROM listings JOIN products ON listings.product_id = products.id JOIN companies ON listings.company_id = companies.id WHERE companies.company_name = $1 AND products.demand = $2", [companyName, demand]);
    return result.rows;
}

export async function getTopProducts(count) {
    const result = await pool.query("SELECT p.id , p.product_name, p.product_image as url, EXISTS(SELECT 1 FROM listings l where l.product_id = p.id and availability = true) as availability FROM products p ORDER BY p.time_added DESC LIMIT $1", [count]);
    return result.rows;
}

//todo: include a mapping helper function to return consistent format
export async function getProductDetails(id) {
    const result = await pool.query("SELECT p.id as product_id, p.product_name, p.product_image, p.description, c.id as company_id, c.company_name, c.company_logo_url, l.url as listing_url, l.time_updated, l.price, l.availability, l.id as listing_id FROM listings l JOIN products p ON l.product_id = p.id JOIN companies c on l.company_id = c.id where l.product_id = $1", [id]);
    return result.rows;
}

export async function getProductsToMonitorByCompany(company, demand) {
    const result = await pool.query("SELECT * FROM listings l join companies c on l.company_id = c.id join (SELECT * FROM products p WHERE p.demand = $1) as p on l.product_id = p.id where c.company_name = $2", [demand, company]);
    return result.rows;
}

export async function getAllCompanies() {
    const result = await pool.query("SELECT * FROM companies");
    return result.rows;
}

export async function getCompanyDetailByName(name) {
    const result = await pool.query("SELECT * FROM companies where company_name = $1", [name]);
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

export async function updateListings(placeholders, listingData) {
    
    const queryText = `
        INSERT INTO listings (product_id, company_id, price, availability, url)
        VALUES
            ${placeholders.join(', ')}
        ON CONFLICT (product_id, company_id) DO UPDATE SET
            price = EXCLUDED.price,
            availability = EXCLUDED.availability,
            url = EXCLUDED.url,
            time_updated = NOW();
    `;

    const rowCounts = await pool.query(queryText, listingData);
    return rowCounts;
}

