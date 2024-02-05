// /** @type {import('next').NextConfig} */

// module.exports = {
//   reactStrictMode: false,
//   experimental: { appDir: true },
//   typescript: { ignoreBuildErrors: true },
// };

const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  typescript: { ignoreBuildErrors: true },
}

module.exports = nextConfig