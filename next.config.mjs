/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  /**
   * 通过 next.config.js 文件中的 redirects 选项，
   * 可以将输入的请求路径重定向到不同的目标路径。
   * @see https://nextjs.org/docs/app/building-your-application/routing/redirecting#redirects-in-nextconfigjs
   */
  async redirects() {
    return [
      {
        source: '/redirect/redirect-id/:id',
        destination: '/redirect/to-redirect-id/:id',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
