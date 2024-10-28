/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables additional React checks during development
    swcMinify: true,       // Enables the SWC compiler minification for faster builds
    images: {
      domains: ['firebasestorage.googleapis.com'], // Add Firebase Storage domain here
    },
  
    
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Allows use of client-specific packages that require `fs`
        config.resolve.fallback = { fs: false };
      }
      return config;
    },
  };
  
  module.exports = nextConfig;
  