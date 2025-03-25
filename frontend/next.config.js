/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'www.google.com',
      'florafoods.com',
      'cdn.britannica.com',
      'iheartumami.com',
      'spicecravings.com',
      'dishingouthealth.com',
      'www.foodandwine.com',
      'www.allrecipes.com',
      'media.istockphoto.com',
      'www.recipetineats.com',
      'www.billyparisi.com',
      'www.realsimple.com',
      'handletheheat.com'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.google.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.foodandwine.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:'florafoods.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:'www.recipetineats.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:'realsimple.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:'www.billyparisi.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:'www.allrecipes.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:'foodandwine.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:'iheartumami.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:'cdn.britannica.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:'dishingouthealth.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:'spicecravings.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:'media.istockphoto.com',
        pathname: '/**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5001/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig