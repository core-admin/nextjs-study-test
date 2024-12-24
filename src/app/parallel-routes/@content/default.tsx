/**
 * 在并行路由中是一个特殊的文件，主要用于以下场景：
 *
 * 1. 未匹配状态处理：
 *    - 当并行路由的 URL 段不匹配时显示
 *    - 类似于 404 页面，但专门用于并行路由槽位
 *
 * 2. 触发时机：
 *    - /parallel-routes        → 显示 page.tsx
 *    - /parallel-routes/about  → 显示 default.tsx（因为 @content/about 和 @footer/about 不存在）
 *    - /parallel-routes/xyz    → 显示 default.tsx（任何未定义的路径）
 *
 * 常见用途：
 *  - 处理未匹配的路由
 *  - 提供默认的降级内容
 *  - 处理并行路由中缺失的部分
 *
 * loading.tsx - 用于专门的加载状态
 */

export default function Page() {
  return <h1 className="text-2xl text-center">@content default.tsx content</h1>;
}
