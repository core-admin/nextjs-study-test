路由组是 Next.js 14 中一个很实用的路由组织功能，主要用途如下：

1. **基本语法**: 用括号 `()` 创建

```
app/
├── (marketing)
│   ├── about/
│   ├── blog/
│   └── layout.tsx
└── (shop)
    ├── cart/
    ├── checkout/
    └── layout.tsx
```

2. **主要用途**:

- 把相关路由分组管理
- 给不同组设置不同的 layout
- 不影响实际 URL 结构（括号不会出现在 URL 中）

3. **常见使用场景**:

```plaintext
app/
├── (auth)
│   ├── login/
│   ├── register/
│   └── layout.tsx     # 登录相关页面的布局
├── (dashboard)
│   ├── profile/
│   ├── settings/
│   └── layout.tsx     # 仪表盘相关页面的布局
└── (marketing)
    ├── about/
    ├── contact/
    └── layout.tsx     # 营销页面的布局
```

以上例子中的路由地址为：

- `/auth/login`
- `/auth/register`
- `/dashboard/profile`
- `/dashboard/settings`
- `/marketing/about`
- `/marketing/contact`

7. **特点**:

- 纯组织功能，不影响路由逻辑
- 可以嵌套使用
- 每个组可以有自己的 layout、loading、error 等文件

这样组织代码更清晰，特别适合大型应用的路由管理。

---

## Route groups （路由组）

在 nextjs 中，app 目录下的文件夹及嵌套文件夹通常会映射到 URL 路径，但你可以将文件夹标记为路由组，阻止文件夹名称被映射到 URL 中。

使用路由组，你可以将路由和项目文件按照逻辑进行分组，但不会影响 URL 路径结构。

nextjs 定义了一个特殊的语法，用括号 `()` 来包裹文件夹，这样就不会影响到 URL 路径。

比如：当前这个文件夹，就是一个典型的例子，在这，其实这个 groups 文件夹我仅仅想起到一个分组的作用（把一些相关代码放到这个目录下），而不是将这个文件夹的名称映射到 URL 中。

```plaintext
app/groups
├── (mobile)
│   ├── user/page.tsx
└── (web)
    ├── user/page.tsx
```

比如当前目录下，我们用设备来区分路由组，将不同的路由组放在不同的文件夹中，这样就可以实现不同设备的路由分组。

当访问 `/groups/mobile/user` 时，会渲染 `app/groups/(mobile)/user/page.tsx`。当访问 `/groups/web/user` 时，会渲染 `app/groups/(web)/user/page.tsx`。

根据设备区分使用不同的组件，这块的逻辑需要自己实现。

## Route groups （路由组） 中的距离并不恰当

会造成一个错误：

> Failed to compile
>
> ## src/app/groups/(mobile)/user/page.tsx
>
> You cannot have two parallel pages that resolve to the same path. Please check /groups/(mobile)/user/page and /groups/(web)/user/page. Refer to the > > route group docs for more information: https://nextjs.org/docs/app/building-your-application/routing/route-groups

## 如果存在移动端与 pc 端的路由，怎么处理？

根据当前的文件路由规则（文件夹嵌套结构），建议使用以下结构：

```plaintext
app/
├── (mobile)
│   └── m/user/        # URL: /m/user
│       └── page.tsx
├── (web)
│   └── w/user/        # URL: /w/user
│       └── page.tsx
└── user/              # 默认 URL: /user
    └── page.tsx       # 在这里做设备检测和重定向
```

然后在默认的 `/user` 路径下做重定向：

```typescript
// app/user/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function UserPage() {
  const userAgent = headers().get('user-agent') || '';
  const isMobile = /mobile/i.test(userAgent);

  // 根据设备类型重定向
  if (isMobile) {
    redirect('/m/user');
  } else {
    redirect('/w/user');
  }
}
```

这样做的好处：

- 避免路由冲突
- 保持了清晰的设备区分
- 用户直接访问 `/user` 时会自动跳转到对应设备版本
- SEO 友好，爬虫可以分别抓取移动版和桌面版

---

如果想保持相同的 URL 路径，最好的方式是使用单一路由 + 条件渲染的方案：

```plaintext
app/
└── user/
    ├── page.tsx           # 主页面，根据设备类型渲染不同组件
    ├── mobile-view.tsx    # 移动端组件
    └── web-view.tsx       # 桌面端组件
```

代码实现：

```typescript
// app/user/page.tsx
import { headers } from 'next/headers';
import MobileView from './mobile-view';
import WebView from './web-view';

export default function UserPage() {
  const userAgent = headers().get('user-agent') || '';
  const isMobile = /mobile/i.test(userAgent);

  return isMobile ? <MobileView /> : <WebView />;
}
```

```typescript
// app/user/mobile-view.tsx
export default function MobileView() {
  return <div>移动端视图</div>;
}
```

```typescript
// app/user/web-view.tsx
export default function WebView() {
  return <div>桌面端视图</div>;
}
```

这种方案的优点：

- 保持单一 URL
- 代码组织清晰
- 避免路由冲突
- 更容易维护和扩展

注意：路由组（Route groups）更适合用于组织不同功能模块的路由，而不是同一路径的不同设备版本。
