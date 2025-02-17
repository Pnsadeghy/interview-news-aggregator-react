import apiInstance from "@/shared/utils/api.utils";

const categoryApi = {
    userList: () => apiInstance.get(process.env.USER_CATEGORIES_LIST_API!)
}

export default categoryApi