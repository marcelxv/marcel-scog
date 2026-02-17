const withMDX = require('@next/mdx')({
  options: {
    // remarkPlugins: [require('remark-gfm')],
    // rehypePlugins: [
    //   require('rehype-slug'),
    //   require('rehype-autolink-headings'),
    //   require('rehype-highlight'),
    // ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = withMDX(nextConfig);