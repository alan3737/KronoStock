import cron from 'node-cron';
import * as db from '../db/queries.js';
import { getEbayData } from '../services/updateProducts.js';

export async function startScheduler() {
    console.log("starting sceduler");
    cron.schedule('*/1 * * * *', async () => {
        console.log("cron high job called");
        await updateAllProduct([
        {   
            name: "ebay",
            getData : getEbayData

        }
    ] , "high");
    });
    // cron.schedule('*/15 * * * *', async () => {
    //     console.log("cron medium job called");
    //     await updateAllProduct([getEbayData], "medium");
    // });
    // cron.schedule('*/30 * * * *', async () => {
    //     console.log("cron low job called");
    //     updateAllProduct([getEbayData], "low");
    // });
}

//update listings
async function updateAllProduct(companies, demand) {
    const generatePlaceholderNumbers = (start, count) =>
    Array.from({ length: count }, (_, i) => `$${start + i}`);
    let listingData = [];
    for (const company of companies) {
        const listings = await db.getProductsToMonitorByCompany(company.name, demand);
        const data = await company.getData(listings);
        listingData.push(...data);
    }
    if (listingData.length === 0) {
        return;
    }
    console.log("listing data: " + listingData);
    let placeholders = [];
    let allValues = [];
    let paramCounter = 1;
    listingData.forEach(listing => {
            if (
                listing.product_id !== undefined &&
                listing.company_id !== undefined &&
                listing.price !== undefined &&
                listing.availability !== undefined &&
                listing.item_url !== undefined
            ) {
                allValues.push(
                    listing.product_id,
                    listing.company_id,
                    listing.price,
                    listing.availability,
                    listing.item_url
                );
                placeholders.push(`(${generatePlaceholderNumbers(paramCounter, 5).join(', ')})`);
                paramCounter += 5;
            } else {
                console.warn("Skipping listing due to missing required data:", listing);
            }
    });
    console.log(placeholders);
    console.log(allValues);
    await db.updateListings(placeholders, allValues);
}

async function addProducts() {
    
}