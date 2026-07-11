  import axios from "axios";

const API = axios.create({
    baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://internationalinstituteoflanguage-1.onrender.com/api",
 
});

export default API;