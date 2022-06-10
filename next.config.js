/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/sample',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
