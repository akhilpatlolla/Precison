/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Lint + typecheck run as separate steps (npx next lint / npx tsc --noEmit);
  // skipping them inside `next build` keeps builds fast.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  basePath: '/Precison',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
