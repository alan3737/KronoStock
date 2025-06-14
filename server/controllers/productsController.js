import * as db from '../db/queries.js'


export function getTopTwentyProducts(req, res) {

    console.log("getting product");

    //query to get all the products
    //return the status/price of each item to frontend
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


//query to get all the items
//query to get all the sellers
//for each companies get their product info