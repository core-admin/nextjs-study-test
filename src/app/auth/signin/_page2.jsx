'use client';

import { useEffect, useState, use } from 'react';

export default function SignIn({ searchParams }) {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const initToken = async () => {
      /**
       * /api/auth/csrf 请求用于 CSRF 保护机制
       *
       * Next.js 的 Server Actions 已经内置了 CSRF 保护机制
       * 它使用了特殊的请求头和令牌来验证请求的合法性
       *
       * /api/auth/csrf 这个端点的作用是：
       *  1.主要用于传统的表单提交方式（如使用 form 的 action URL）
       *  2.当你配置表单 action 为 /api/auth/callback/credentials 时需要
       * 3.提供 CSRF token 来防止跨站请求伪造攻击
       *
       * Server Actions 使用了更现代的安全机制，不需要手动处理 CSRF 保护。
       */
      const response = await fetch('http://localhost:3000/api/auth/csrf');
      const { csrfToken } = await response.json();
      setCsrfToken(csrfToken);
    };
    initToken();
  }, []);

  const data = use(searchParams);
  const { callbackUrl } = data;

  console.log('searchParams >>>', data);

  return (
    <form
      action="/api/auth/callback/credentials"
      method="POST"
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
        <input type="hidden" name="csrfToken" value={csrfToken} />
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
