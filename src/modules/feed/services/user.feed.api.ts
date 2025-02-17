import apiInstance from "@/shared/utils/api.utils";

const userFeedApi = {
    get: () => apiInstance.get(process.env.USER_FEED_CONFIG_GET_API!),
    update: (data: {
        sources: string[]
        categories: string[]
        authors: string[]
    }) => apiInstance.put(process.env.USER_FEED_CONFIG_UPDATE_API!, data)
}

export default userFeedApi