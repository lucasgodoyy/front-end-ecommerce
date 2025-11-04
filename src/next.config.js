/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // ⚠️ essencial para styled-components funcionar
  },
};

module.exports = nextConfig;
