import axios from 'axios';
require('dotenv').config();
const { APP_BASE_URL } = process.env;

const baseURL = `${APP_BASE_URL}/`;

const instance = axios.create();

instance.defaults.baseURL = baseURL;

export default instance;
