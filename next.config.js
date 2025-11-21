/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.devtool = 'source-map';
    return config;
  }
};

module.exports = nextConfig;