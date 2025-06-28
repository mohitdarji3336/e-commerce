// next.config.js
module.exports = {
  eslint: {
    ignoreDuringBuilds: true, // disables ESLint during production builds
  },
  typescript: {
    ignoreBuildErrors: true, // disables TypeScript type checking during build
  },
};

