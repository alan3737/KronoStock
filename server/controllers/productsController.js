import * as db from '../db/queries.js'

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

