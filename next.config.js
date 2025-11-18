/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Following only for development, remove for production (also remove .map from s3 website upload)
  // Enable source maps for better debugging
  productionBrowserSourceMaps: true,
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Configure webpack for better source maps
  webpack: (config) => {
    config.devtool = 'source-map';
    return config;
  }
};

module.exports = nextConfig;