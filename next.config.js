/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Bundle your MDX files with the server code on Vercel
    outputFileTracingIncludes: {
      '/**/*': ['./content/blog/**/*'],
      '/app/blog/page': ['./content/blog/**/*'],
      '/app/blog/[slug]/page': ['./content/blog/**/*'],
    },
  },
};
module.exports = nextConfig;
