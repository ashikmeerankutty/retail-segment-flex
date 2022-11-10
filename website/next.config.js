/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const devConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
    unoptimized: true
  },
};

/** @type {import('next').NextConfig} */
const prodConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  }
};

module.exports = (phase) =>
  phase === PHASE_DEVELOPMENT_SERVER ? devConfig : prodConfig;
