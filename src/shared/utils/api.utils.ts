import {AUTH_TOKEN_COOKIE_KEY} from "@/shared/constants"
import axios, {type AxiosError} from 'axios'
import Cookies from 'js-cookie'

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

export const getApiCallErrorMessage = (error: unknown): string => {
    const apiError = error as AxiosError
    return apiError.response?.data?.message || ''
}

export default apiInstance