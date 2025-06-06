const isDev = false;

const LIVE_BACKEND_BASE_URL = "https://globalweather-backend.onrender.com"
const DEV_BACKEND_BASE_URL = "http://127.0.0.1:4988"
const BACKEND_BASE_URL = isDev ? DEV_BACKEND_BASE_URL : LIVE_BACKEND_BASE_URL;