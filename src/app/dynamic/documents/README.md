## [id] 动态路由-单路由段

nextjs 中，可以使用动态路由来实现页面的动态渲染。动态路由是指在路由路径中使用占位符来表示动态部分，然后在页面组件中通过 props 来获取路由参数。

比如：从文档列表页面跳转到文档详情页面，文档详情页面的路径可以是 `/documents/:id`，其中 `:id` 就是一个动态路由参数。在文档详情页面的组件中，可以通过 `props` 来获取到 `id` 参数，从而实现动态渲染。

取值方式：`props.params.id`

`[xxx]` 使用方括号命名的文件夹，在 Next.js 中被称为动态路由。

通过 `[id]` 中括号来定义一个动态路由页面，其中的 `id` 就是动态路由参数。在页面组件中，可以通过 `props` 来获取到 `id` 参数，从而实现动态渲染。

## [...ids] 动态路由-多个路由段

使用 `[...ids]` 的命名方式，它表示一个可变数量的参数，这些参数将被收集到一个数组中，通过 `props.params` 来获取到 `ids` 参数，从而实现动态渲染。

这种定义动态路由的方式与 `[id]` 类似，但是它可以匹配多个参数，这些参数将被收集到一个数组中。

比如：

1. `src/app/dynamic/documents/[id]/page.tsx` 当访问这个页面时，其 `pathname` 为 `/dynamic/documents/1`，那么 `props.params.id` 为 `1`。

2. `src/app/dynamic/documents/[...ids]/page.tsx` 当访问这个页面时，其 `pathname` 为 `/dynamic/documents/1/2/3`，那么 `props.params.ids` 为 `['1', '2', '3']`。

当同时存在捕获单个单个路由段与多个路由段的路由定义时，会优先匹配单个路由段。

比如：`/dynamic/documents/1` 则匹配 `[id]/page.tsx`，而 `/dynamic/documents/1/2/3` 则匹配 `[...ids]/page.tsx`。

两者不冲突。

## [[...id]] 动态路由-可选路由段

如果需要定义一个可选的路由段，比如：`/dynamic/documents/1` 中，`params.id` 可传可不传，就可以使用 `[[...id]]` 来定义。

此时，`params.id` 的数据结构如下：

```typescript
{
  params: {
    id?: string[];
  }
}
```

`[[...id]]` 这种定义方式结合了以上的 `[...ids]` 与 `[id]` 的定义方式，它可以匹配多个参数，也可以不匹配任何参数。

主要注意的是：不存在 `[[id]]` 这种定义方式。
