/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['localhost:4000'] //config untuk penyedia image
  },
  // output: "export"
}

module.exports = nextConfig
