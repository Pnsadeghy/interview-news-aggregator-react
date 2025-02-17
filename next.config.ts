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
    USER_FEED_CONFIG_UPDATE_API: 'user/userFeed',
    USER_AUTHORS_API: 'user/userFeed',
  },
};

export default withNextIntl(nextConfig);
