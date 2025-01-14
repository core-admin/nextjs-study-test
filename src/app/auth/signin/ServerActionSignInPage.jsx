import { use } from 'react';
import { action } from './action';

/**
 * 使用 Server Action 提交数据 + 显示错误信息
 */
export default function ServerActionSignIn({ searchParams }) {
  const data = use(searchParams);
  const { callbackUrl, error } = data;

  console.log('searchParams >>>', data);

  return (
    <form
      /**
       * 使用 action 地址的形式，当 authorize 未通过，比如密码不对，页面直接刷新了，体验不好。
       */
      // action="/api/auth/callback/credentials"

      action={action}
      // onSubmit={e => {
      //   e.preventDefault();
      //   startTransition(() => {
      //     action(e.target);
      //   });
      // }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        zIndex: 9999,
      }}
    >
      <div>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <label htmlFor="username" style={{ width: '100px', textAlign: 'right' }}>
            用户名：
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            style={{
              border: '1px solid #1677ff',
              padding: '4px',
              borderRadius: '4px',
              outline: 'none',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '20px',
          }}
        >
          <label htmlFor="password" style={{ width: '100px', textAlign: 'right' }}>
            密码：
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            style={{
              border: '1px solid #1677ff',
              padding: '4px',
              borderRadius: '4px',
              outline: 'none',
            }}
          />
        </div>

        {!!error && (
          <div
            style={{
              paddingLeft: '100px',
              marginTop: '8px',
              color: 'red',
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            paddingLeft: '100px',
          }}
        >
          <button
            type="submit"
            style={{
              margin: '20px auto 0',
              display: 'block',
              width: '150px',
              backgroundColor: '#1677ff',
              borderRadius: '4px',
              padding: '8px 12px',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            登录
          </button>
        </div>
      </div>
    </form>
  );
}
