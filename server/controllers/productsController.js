import * as db from '../db/queries.js'

/** 
 * Returns the most recently added products
 * @param {*} req - {count}
 * @param {*} res - {id, name, image_url, availability}
*/
export async function getTopProducts(req, res) {
    console.log("getting top products");
    try {
        const {count} = req.params;
        if (!count) {
            return res.status(400).send("count not found");
        }
        const dataRows = await db.getTopProducts(count);
        res.status(200).json(dataRows);
    }   
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

/** 
 * Returns the details of a product given id
 * @param {*} req - {id}
 * @param {*} res - 
*/
export async function getProductDetails(req, res) {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).send("id not found");
        }
        const productDetails = await db.getProductDetails(id);
        if (!productDetails ||  productDetails.length === 0) {
            return res.status(400).send("id not found");
        }
        console.log(productDetails);
        const mainProductDetails = {
            listingID: productDetails[0].listing_id,
            productID: productDetails[0].product_id,
            productName: productDetails[0].product_name,
            productImageUrl: productDetails[0].product_image_url,
        };
        const companyListings = productDetails.map((row) => ({
                companyID: row.company_id,
                companyName: row.company_name,
                companyLogoUrl: row.company_logo_url,
                listingUrl: row.listing_url,
                lastPrice: row.price,
                timeUpdated: row.time_updated,
                availability: row.availability
        }));
        const apiResponseProductDetails = {
            ... mainProductDetails,
            companyDetails: companyListings
        }
        console.log(apiResponseProductDetails);
        res.status(200).json(apiResponseProductDetails);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

/** 
 * Returns the historical prices of the product
 * @param {*} req -
 * @param {*} res - 
*/
export function getProductHistoryPrice(req, res) {
    try {

    }
    catch(err) {

    }
}

/**
 * Returns the historical in stock status
 * @param {*} req -
 * @param {*} res - 
 */
export function getProductHistoryStatus(req, res) {
    try {

    }
    catch(err) {

    }
}

export async function getKeyWordProductInSearch(req, res) {
    try {
        const productArray = await db.getAllProductsThatStartWithKeyword(req.params.productName);
        res.json(productArray); 
    }
    catch(err){
        console.error(err)
        res.status(500).send("Server Error");
    }
}