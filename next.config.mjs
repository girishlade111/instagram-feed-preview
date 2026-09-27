/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/instagram-feed-preview',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig