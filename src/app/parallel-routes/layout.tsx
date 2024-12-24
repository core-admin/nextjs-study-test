import { Metadata } from 'next';

// 添加元数据定义
export const metadata: Metadata = {
  title: 'Parallel Routes Example',
};

export default function Layout(props: {
  children: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
}) {
  const { children, content, footer } = props;

  // 添加调试日志
  console.log('Layout Props:', props, {
    hasChildren: !!children,
    hasContent: !!content,
    hasFooter: !!footer,
  });

  return (
    <div className="bg-slate-200 flex items-center justify-center h-screen">
      <div className="overflow-hidden rounded-md bg-white shadow-sm w-4/5">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="px-6 py-4 flex justify-center items-center">{children}</li>
          <li className="px-6 py-4">{content}</li>
          <li className="px-6 py-4">{footer}</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * 平行路由可以使你在同一个布局中同时或者有条件的渲染一个或者多个页面（类似于 Vue 的插槽功能）。
 *
 * 平行路由的使用方式就是将文件夹以 @ 作为开头进行命名，
 * 这个文件夹下面的 page.js 将会自动注入文件夹同级 layout 的 props 中。
 */
