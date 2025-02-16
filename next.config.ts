import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    output: 'export',
  /* config options here */
};

export default withNextIntl(nextConfig);
