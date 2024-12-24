## 路由切换时，templte.tsx 文件报错

> `app-index.tsx:25 Warning: A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.`

这是因为 `template.tsx` 的特性 - 它在每次路由切换时都会重新创建一个新实例。

要解决这个警告，我们需要缓存 Promise。修改如下：

```typescript
'use client';

import React, { Suspense, use, useEffect, useState } from 'react';

// 将 sleep Promise 缓存在组件外部
const sleepPromise = sleep();

function SleepComponent() {
  // 使用缓存的 Promise
  use(sleepPromise);

  return (
    <div className="h-10 mt-5 mb-2 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
      Hello, Template!
    </div>
  );
}
```

或者使用 useMemo 缓存：

```typescript
'use client';

function SleepComponent() {
  const promise = useMemo(() => sleep(), []);
  use(promise);

  return (
    <div className="h-10 mt-5 mb-2 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
      Hello, Template!
    </div>
  );
}
```

这样做的原因是：

1. 未缓存的 Promise 每次渲染都会创建新实例
2. React 需要一个稳定的 Promise 引用来正确处理 Suspense
3. Template 组件的重新创建特性会导致这个问题更明显

注意：如果你需要在每次路由切换时都重新执行异步操作，那么使用 useState + useEffect 的方案可能更合适。

## 疑问

为什么 react 会有这种行为呢，路由切换，template 重新实例化，template.tsx 组件内部用到的组件全部重新渲染，这应该没什么问题呀，为什么：React 需要一个稳定的 Promise 引用来正确处理 Suspense，我父组件都卸载重新生成了。

---

这是因为 React Suspense 的工作机制：

1. **Suspense 的设计初衷**

- Suspense 最初是为数据获取设计的
- 它期望处理的是可缓存的、幂等的操作（如 API 请求）
- 不是为处理每次都需要重新执行的副作用（如 setTimeout）

2. **Promise 标识问题**

```typescript
// 每次渲染都创建新 Promise
use(new Promise(/*...*/)); // ❌ 不好

// 使用稳定引用的 Promise
use(cachedPromise); // ✅ 好
```

React 需要通过 Promise 的引用来：

- 追踪 Promise 的状态
- 决定何时显示 fallback
- 决定何时显示内容
- 避免重复触发 suspense

3. **为什么父组件重新创建也不行**

```typescript
// 即使在新实例中，React 仍然需要：
- 知道这个 Promise 是否解决过
- 是新的数据请求还是重复的请求
- 是否需要显示 loading 状态
```

更好的做法：

```typescript
'use client';

// 1. 如果确实需要每次都重新执行
function SleepComponent() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <Loading />;
  return <div>Content</div>;
}

// 2. 如果是数据获取，使用专门的库
function DataComponent() {
  const { data, isLoading } = useQuery('key', fetchData);

  if (isLoading) return <Loading />;
  return <div>{data}</div>;
}
```

这个限制主要是 React 内部实现的考虑，而不是逻辑上的必然。未来可能会改变这种行为。
