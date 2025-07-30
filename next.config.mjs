/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Suppress hydration warnings in development
  reactStrictMode: true,
  experimental: {
    suppressHydrationWarning: true,
  },
}

export default nextConfig
