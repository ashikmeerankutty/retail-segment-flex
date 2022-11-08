import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = (phase) => {
  if( phase === PHASE_DEVELOPMENT_SERVER){
    return {
      ...nextConfig,
      env: {
        server: "http://localhost:3000"
      }
    }
  }
  else{
    const domain = window.location.host
    return {
      ...nextConfig,
      env: {
        server: `https://${domain}`
      }
    }
  }
}
