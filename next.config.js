/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['localhost:4000'] //config untuk penyedia image
  },
  // output: "export"
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
