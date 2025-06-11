import * as db from '../db/queries.js'
import fetch from 'node-fetch'
import dotenv from 'dotenv';
dotenv.config();

let ebayToken = null;
let ebayTokenExpireAt = 0;

async function getEbayToken(){
    const now = Date.now();
    if (ebayToken && ebayTokenExpireAt - now > 60 * 1000) {
        return ebayToken;
    }
    const response = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${process.env.EBAY_CREDENTIAL}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            scope: 'https://api.ebay.com/oauth/api_scope'
        })
    });
    if (!response.ok) {
        throw new Error(`Failed to get token: ${response.status} ${response.statusText}`);
    }
    const tokenData = await response.json();
    ebayToken = tokenData.access_token;
    ebayTokenExpireAt = now + tokenData.expires_in * 1000;
    return ebayToken;
}

async function updateProductsFromCompany(companyName, demand){
    const lowerCaseCompanyName = companyName.toLowerCase();
    if(lowerCaseCompanyName=== "ebay"){
            let prodArray;
            let token;
            try{
                prodArray = await db.getAllProductsFromCompanyWithDemand(lowerCaseCompanyName, demand);
            }
            catch(err){
                console.error("Error retrieving from database", err);
                return;
            }
            try{
                token = await getEbayToken();
            }
            catch(err){
                console.error("Error retrieving token: ", err);
                return;
            }
            for(let i = 0; i < prodArray.length; i++){
                try{
                    const result = await fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${prodArray[i].product_name}&category_ids=${prodArray[i].category_id}&epid=${prodArray[i].epid}`, {
                        method: "GET",
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const resultJSON = await result.json();
                    const item_summary = resultJSON.itemSummaries || [];
                    if(item_summary.length === 0){
                        continue;
                    }
                    let outOfStock = 0;
                    for(let j = 0; j < item_summary.length; j++){
                        try{
                            const item_id = item_summary[j].itemId;
                            const item_response = await fetch(`https://api.ebay.com/buy/browse/v1/item/${item_id}`, {
                                method: "GET",
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                            const item_data = await item_response.json();
                            const newPrice = parseFloat(item_data.price.value)
                            if(item_data.estimatedAvailabilities.estimatedAvailabilityStatus === 'IN_STOCK' && prodArray[i].availability){
                                if(prodArray[i].price !== newPrice){
                                    await db.updateProductPrice(prodArray[i].id, newPrice);
                                }
                                break;
                            }
                            else if(item_data.estimatedAvailabilities.estimatedAvailabilityStatus === 'IN_STOCK' && !prodArray[i].availability){
                                await db.updateProductPriceAndAvailability(prodArray[i].id, newPrice, true);
                                break;
                            }
                            else{
                                outOfStock++;
                            }
                        }
                        catch(err){
                            console.error(`Error processing item ${item_summary[j].itemId}:`, err);
                        }
                    }
                    if(outOfStock === item_summary.length){
                        await db.updateProductAvailability(prodArray[i].id, false);
                    }
                }
                catch(err){
                    console.error(`Error processing product ${prodArray[i].product_name}:`, err)
                }
            }
    }
}