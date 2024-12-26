/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {},
  /**
   * 跳过尾随斜杠重定向
   * 默认情况下，Next.js 会自动将带有尾随斜杠的 URL 重定向到不带尾随斜杠的 URL。
   * 例如，访问 http://localhost:3000/user/ 会重定向到 http://localhost:3000/user。
   * 设置 skipTrailingSlashRedirect: true 后，将不会进行尾随斜杠重定向。
   *
   * 经过测试发现，这个配置仅使用与二级以上的路由，一级路由不生效，
   * 比如：http://localhost:3000/user/ 不管设置为 true 还是 false，都会重定向到 http://localhost:3000/user。
   */
  skipTrailingSlashRedirect: false,

  /*
    要用于控制 URL 规范化行为，默认情况下 Next.js 会自动规范化 URL，例如：/about///// 会被规范化为 /about，/%41bout 会被规范化为 /About
    开启后 (true): URL 不会被规范化，middleware 将收到原始 URL，对于需要精确匹配 URL 的场景很有用。

    使用场景：
      1. 代理服务器：当你的 Next.js 应用作为代理时；需要保持原始 URL 格式传递给后端。
      2. 特殊 URL 处理：需要处理包含特殊编码的 URL，需要区分 /about 和 /about/。
      3. 安全检查：需要检测 URL 操作行为；防止 URL 规范化绕过安全检查。

    middleware >
      true: eq.nextUrl.pathname > /_next/data/build-id/hello.json
      false: eq.nextUrl.pathname > /hello
  */
  skipMiddlewareUrlNormalize: false,
};

export default nextConfig;
