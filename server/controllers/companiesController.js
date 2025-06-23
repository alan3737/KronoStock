import * as db from '../db/queries.js';

export async function getAllCompanies(req, res) {
    try {
        console.log("geting the c");
        const companyArray = await db.getAllCompanies();
        
        res.json(companyArray); 
    }
    catch(err){
        console.error(err)
        res.status(500).send("Server Error");
    }
}