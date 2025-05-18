/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "http://localhost:3000", // accessible as process.env.CUSTOM_VAR
  },
  eslint: {
    ignoreDuringBuilds: true, // ignore eslint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // ignore typescript errors during build
  },
};

export default nextConfig;
