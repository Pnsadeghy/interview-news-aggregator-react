import apiInstance from "@/shared/utils/api.utils"

const authApi = {
    login: (data: {email: string, password: string}) => apiInstance.post(`auth/login`, data),
    register: (data: {name: string, email: string, password: string, password_confirmation: string}) =>
        apiInstance.post(`auth/register`, data)
}

export default authApi