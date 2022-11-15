/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/HomeView",
        permanent: true,
      },
    ];
  },
};

/** @type {import('next').NextConfig} */
const devConfig = {
  ...baseConfig,
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
};

/** @type {import('next').NextConfig} */
const prodConfig = {
  ...baseConfig,
  images: {
    unoptimized: true,
  },
};

module.exports = (phase) =>
  phase === PHASE_DEVELOPMENT_SERVER ? devConfig : prodConfig;
