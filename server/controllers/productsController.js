import * as db from '../db/queries.js'

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

