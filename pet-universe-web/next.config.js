/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  images: {
    domains: ['localhost', 'images.unsplash.com', 'via.placeholder.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable static exports for Netlify
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
}

module.exports = nextConfig