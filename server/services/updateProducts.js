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

async function getEbayData(productArray){
    const listingData = [];
    let token;
    try{
        token = await getEbayToken();
    }
    catch(err){
        console.error("Error retrieving token: ", err);
        return;
    }
    for(let i = 0; i < productArray.length; i++){
        try{
            const result = await fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(productArray[i].product_name)}&category_ids=${productArray[i].category_id}&epid=${productArray[i].epid}&limit=5`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const resultJSON = await result.json();
            const item_summary = resultJSON.itemSummaries || [];
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
                    const newPrice = parseFloat(item_data.price.value);
                    const ebayAvail = item_data.estimatedAvailabilities[0].estimatedAvailabilityStatus === 'IN_STOCK';
                    const dbAvail = productArray[i].availability;
                    const priceChanged = Math.abs(newPrice - Number(productArray[i].price)) > 0.001;
                    if(ebayAvail){
                        if(!dbAvail || priceChanged){
                            const newListingData = {listing_id: productArray[i].id, price: newPrice, availability: ebayAvail};
                            listingData.push(newListingData);
                        }
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
                const newListingData = {listing_id: productArray[i].id, price: productArray[i].price, availability: false};
                listingData.push(newListingData);
            }
        }
        catch(err){
            console.error(`Error processing product ${productArray[i].product_name}:`, err)
        }
    }
    return listingData;
}
const prodArray = await db.getAllProductsFromCompanyWithDemand('ebay', 'high');
getEbayData(prodArray).then((data) => console.log(data));