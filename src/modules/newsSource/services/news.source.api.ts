import apiInstance from '@/shared/utils/api.utils';

const newsSourceApi = {
  userList: () => apiInstance.get(process.env.USER_NEWS_SOURCES_LIST_API!),
};

export default newsSourceApi;
