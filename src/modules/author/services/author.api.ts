import apiInstance from '@/shared/utils/api.utils';

const authorApi = {
  userList: () => apiInstance.get(process.env.USER_AUTHORS_LIST_API!),
};

export default authorApi;
