import {AUTH_TOKEN_COOKIE_KEY} from "@/shared/constants"
import Cookies from 'js-cookie'
import axios from 'axios'

const apiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

apiInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get(AUTH_TOKEN_COOKIE_KEY)
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default apiInstance