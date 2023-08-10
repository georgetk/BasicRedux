import axios from 'axios';

const BASE_URL = 'https://my-json-server.typicode.com';

const PRODUCTS_ENDPOINT = '/benirvingplt/products/products';

const axiosService = axios.create({baseURL: BASE_URL});

export {PRODUCTS_ENDPOINT, axiosService};
