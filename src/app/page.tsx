// https://juejin.cn/post/6844903638289252360?searchId=202501061642315312019F8429E67EFA68

'use client';

const Button1 = () => {
  return (
    <>
      <button className="btn">
        <span>111</span>
      </button>

      <style jsx>{`
        button {
          background-color: #ccc;
          padding: 8px 16px;
          border-radius: 8px;
          color: blue;
        }

        .btn {
          font-size: 20px;
        }
      `}</style>
    </>
  );
};

const Button2 = () => {
  return (
    <>
      <button>
        <span>111</span>
      </button>

      <style jsx>{`
        button {
          background-color: #ccc;
          padding: 8px 16px;
          border-radius: 8px;
          color: green;
        }
      `}</style>
    </>
  );
};

const SkeletonCard = () => (
  <>
    <div className="skeleton">
      <div>
        <Button1 />
        <Button2 />
      </div>
      <div className="skeleton-img" />
      <div className="skeleton-btn" />
      <div className="skeleton-line-one" />
      <div className="skeleton-line-two" />
      <button className="btn">11111111</button>
    </div>
    <style jsx>{`
      .skeleton {
        padding: 1rem /* 16px */;
        border-radius: 1rem /* 16px */;
        background-color: rgb(24 24 27 / 0.8);

        & + .skeleton {
          margin-top: 1.5rem /* 24px */;
        }
      }

      .skeleton-img,
      .skeleton-btn,
      .skeleton-line-one,
      .skeleton-line-two {
        border-radius: 0.5rem /* 8px */;
      }

      .skeleton-img {
        height: 3.5rem /* 56px */;
        background-color: rgb(63 63 70 / 1);
      }

      .skeleton-btn,
      .skeleton-line-one,
      .skeleton-line-two {
        margin-top: 0.75rem /* 12px */;
        height: 0.75rem /* 12px */;
      }

      .skeleton-btn {
        background-color: rgb(0 112 243 / 1);
        width: 25%;
      }

      .skeleton-line-one,
      .skeleton-line-two {
        background-color: rgb(63 63 70 / 1);
      }

      .skeleton-line-one {
        width: 91.666667%;
      }

      .skeleton-line-two {
        width: 66.666667%;
      }

      .btn {
        font-size: 30px;
      }
    `}</style>
  </>
);

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">Styled with Styled JSX</h1>
      <div className="container">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

/**
 * styled-jsx 是 React 的 CSS-in-JS 库，它允许你在 JSX 中编写 CSS，nextjs 默认支持 styled-jsx
 *
 * styled-jsx 采用运行时编译，在编译时，styled-jsx 会解析 CSS 代码，并生成一个唯一的类名，然后将这个类名添加到组件的 className 属性中。
 *
 * 由于 styled-jsx 它依赖于 React 的客户端渲染来动态生成和插入样式，所以需要将组件标记为 `use client`。
 *
 * 但在 Next.js 的服务器组件中，styled-jsx 也可以使用，需要修改 `layout.tsx` 文件。
 *
 * 注意事项：styled-jsx 的核心实现入口引入了 'client-only' 包，这个表用来表示此功能必须在客户端组件中使用。
 * 所以，在 rcs 文件中，是无法使用 styled-jsx 直接编写样式的，只能是将组件标记为 `use client` 后，在 rcs 组件中引入使用。
 */
