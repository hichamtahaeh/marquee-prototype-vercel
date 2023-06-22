// import axios from 'axios';

// // Initiate slack axios instance with authorization header.
// const sanityAxios = axios.create({
//   baseURL: `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07`,
//   headers: {
//     Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
//   },
// });

// // Standardize axios response resolve and reject middleware.
// sanityAxios.interceptors.response.use(
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   (response) => ({ pass: true, data: response.data }),
//   (err) => {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     console.log('sanity err', err.response || err);
//     if (!!err.response === false) {
//       return {
//         status: 504,
//         statusText: 'Internal Server Error',
//         pass: false,
//         data: 'Something went wrong with the Henesys API, please check the logs.',
//       };
//     }

//     const formattedResponse = {
//       pass: false,
//       data: '',
//       status: err.response.status,
//       statusText: err.response.statusText,
//     };

//     // Check if endpoint exists.
//     if (err.response.status === 404) {
//       formattedResponse.pass = false;
//       formattedResponse.data = 'Endpoint does not exist.';
//       return formattedResponse;
//     }

//     // Check if data was returned.
//     if (err.response.data === undefined) {
//       formattedResponse.pass = false;
//       formattedResponse.data = 'Something went wrong in the API call.';
//       return formattedResponse;
//     }

//     // Return data.
//     return { ...formattedResponse, ...err.response.data };
//   }
// );

// const queryDataset = async ({ dataSet = process.env.NEXT_PUBLIC_SANITY_DATASET, q = '' }) => {
//   if (!!q === false || q.trim() === '') {
//     return { pass: false, data: 'Please enter a valid query.' };
//   }
//   const query = encodeURIComponent(q);
//   const response = await sanityAxios.get(`/data/query/${dataSet}?query=${query}`);
//   if (!response.pass) {
//     console.log('sanity query failed', response.data);
//   } // Any error handling.

//   return response;
// };

// module.exports = {
//   sanityAxios,
//   queryDataset,
// };
