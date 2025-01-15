/** @type {import('next').NextConfig} */

console.log('node version >>>>>>>>>>>>>>>>>>>>>>>', process.version);


const nextConfig = {
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
