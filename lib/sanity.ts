const axios = require('axios');
const { createClient } = require('@sanity/client');

const sanityClient = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
    token: process.env.SANITY_API_TOKEN, // Only if you want to update content with the client
});

module.exports = {
    sanityClient,
};
