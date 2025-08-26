/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ensure Markdown files are bundled with the server on Vercel
    outputFileTracingIncludes: {
      '/**/*': ['./content/blog/**/*'],
      '/app/blog/page': ['./content/blog/**/*'],
      '/app/blog/[slug]/page': ['./content/blog/**/*'],
    },
  },
}

module.exports = nextConfig
