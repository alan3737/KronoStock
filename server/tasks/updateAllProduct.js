import cron from 'node-cron';
import * as db from '../db/queries.js';

export function startScheduler() {
    console.log("starting sceduler");
    cron.schedule('*/5 * * * *', async () => {
        console.log("cron job called");
    });
}


async function getProductsToMonitor() {
    
}

async function updateAllProduct(listingsData) {
    
}

//