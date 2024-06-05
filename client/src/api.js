import axios from "axios"
import { ACCESS_TOKEN } from "./constants"
import {getAccessToken,isTokenValid,refreshAccessToken, setRefreshToken} from "./utils/auth"
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
api.interceptors.request.use(
    async (config)=>{
        var token = getAccessToken()
        if (token && !isTokenValid(token)) {
            token = await refreshAccessToken();
            console.log("Token after refresh:", token);
        }
        if (token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
export default api
