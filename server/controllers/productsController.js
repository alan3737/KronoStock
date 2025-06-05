import * as db from '../db/queries.js'

export async function getKeyWordProductInSearch(req, res) {
    try {
        const dataRows = await db.getAllProductsThatStartWithKeyword(req.params.productName.toLowerCase());
        res.json(dataRows); 
    }
    catch(err){
        console.error(err)
        res.status(500).send("Server Error");
    }
}

