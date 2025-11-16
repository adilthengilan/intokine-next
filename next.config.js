/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // for static export
  images: {
    unoptimized: true, // disables image optimization
  },
};

module.exports = nextConfig;
