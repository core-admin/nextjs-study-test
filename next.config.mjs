/** @type {import('next').NextConfig} */

console.log('node version >>>>>>>>>>>>>>>>>>>>>>>', process.version);

console.log('DATABASE_URL >>>>>>>>>>>>>>>>>>>>>>>', process.env.DATABASE_URL);

const nextConfig = {
  output: 'standalone',
  experimental: {
    staleTimes: {
      // 在nextjs15中，缓存行为都变为了默认不缓存了，需要自己手动开启
      // dynamic: 30,
      // static: 180,
    },
  },
};

// 1

export default nextConfig;

/*



`output: 'standalone'` 是 Next.js 的一个特殊构建输出模式，专门为容器化部署优化：

主要作用：
1. 生成一个独立的 `/standalone` 目录，包含运行应用所需的最小文件集
2. 自动剔除开发依赖和不必要的 node_modules
3. 只保留生产环境必需的文件，大幅减小最终镜像体积

输出目录结构：
```
.next/
  ├─ standalone/          # 独立运行所需的全部文件
  ├─── .next/             
  ├─── node_modules/
  ├─── package.json
  ├─── server.js          # 入口文件
  ├─ static/             # 静态资源
```

这就是为什么 Dockerfile 中要：
```Dockerfile
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
```

这个模式特别适合 Docker 部署，因为它创建了一个高度优化的生产构建。


*/
