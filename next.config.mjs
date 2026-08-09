/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ['172.20.10.4', '192.168.8.162', 'localhost', '127.0.0.1'],
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
