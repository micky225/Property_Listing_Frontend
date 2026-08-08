/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'http', hostname: '127.0.0.1', port: '8000', pathname: '/media/**' },
      { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/media/**' },
      {
        protocol: 'https',
        hostname: 'poperty-listing-backend.onrender.com',
        pathname: '/media/**',
      },
      { protocol: 'https', hostname: '**', pathname: '/media/**' },
    ],
  },
}

export default nextConfig
