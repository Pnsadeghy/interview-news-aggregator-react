import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    output: 'export',
    env: {
        AUTH_LOGIN_API: 'auth/login',
        AUTH_REGISTER_API: 'auth/register',
        AUTH_LOGOUT_API: 'auth/logout'
    }
};

export default withNextIntl(nextConfig);
