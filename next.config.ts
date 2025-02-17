import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  env: {
    AUTH_LOGIN_API: 'auth/login',
    AUTH_REGISTER_API: 'auth/register',
    AUTH_LOGOUT_API: 'auth/logout',
    USER_ARTICLES_LIST_API: 'user/articles',
    USER_FEED_ARTICLES_LIST_API: 'user/articles/feed',
    USER_FEED_CONFIG_GET_API: 'user/userFeed',
    USER_FEED_CONFIG_UPDATE_API: 'user/userFeed/config',
    USER_CATEGORIES_LIST_API: 'user/categories',
    USER_NEWS_SOURCES_LIST_API: 'user/newsSources',
    USER_AUTHORS_LIST_API: 'user/authors',
  },
};

export default withNextIntl(nextConfig);
