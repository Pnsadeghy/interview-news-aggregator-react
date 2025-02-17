import apiInstance from '@/shared/utils/api.utils';

const articleApi = {
  index: (data: object, url?: string) =>
    apiInstance.post(url || process.env.USER_ARTICLES_LIST_API!, data),
};

export default articleApi;
