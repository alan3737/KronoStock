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
 * Returns the historical prices of the product
 * @param {*} req - {id}
 * @param {*} res - 
*/
export async function getProductDetails(req, res) {
    try {
        const {id} = res.params;
        if (!id) {
            return res.status(400).send("id not found");
        }
        const productDetails = await db.getProductDetails(id);
        if (!productDetails ||  productDetails.length === 0) {
            return res.status(400).send("id not found");
        }
        const mainProductDetails = {
            listingID: productDetails[0].listingID,
            productID: productDetails[0].productID,
            productName: productDetails[0].productName,
            productImageUrl: productDetails[0].productImageUrl,
        };
        const companyListings = productDetails.map((row) => ({
                companyID: row.companyID,
                companyName: row.companyName,
                companyLogoUrl: row.companyLogoUrl,
                listingUrl: row.listingUrl,
                lastPrice: row.price,
                lastAvailable: row.lastAvailable,
                availability: row.availability
        }));
        const apiResponseProductDetails = {
            ... mainProductDetails,
            companyDetails: companyListings
        }
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

export async function getKeyWordProductFromAllCompanies(req, res) { //Returns an array with each indices containing an array that contains all of the products with the same name. For example, [[switch (eBay), switch (bestBuy)], [sweets (eBay), sweets (bestBuy)]]
    try {
        const dataRows = await db.getAllProductsThatStartWithKeyword(req.params.productName.toLowerCase());
        let current = null;
        const allProductStartingWithKeyword = [];
        let currentArr = -1;
        for(let i = 0; i < dataRows.length; i++){
            if(current !== dataRows[i].product_name){
                current = dataRows[i].product_name;
                currentArr++;
                allProductStartingWithKeyword[currentArr] = [];
            }
            allProductStartingWithKeyword[currentArr].push(dataRows[i]);
        }
        res.json(allProductStartingWithKeyword); 
    }
    catch(err){
        console.error(err)
        res.status(500).send("Server Error");
    }
}


//query to get all the items
//query to get all the sellers
//for each companies get their product info