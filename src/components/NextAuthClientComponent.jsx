'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export function Profile({ session }) {
  return (
    <div>
      <ul>
        <li>Name: {session.user.name}</li>
        <li>Email: {session.user.email}</li>
        <li>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Image:{' '}
            <img
              src={session.user.image}
              width="100"
              height="100"
              alt="avatar"
              style={{
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </div>
        </li>
        <style jsx>{`
          li + li {
            margin-top: 16px;
          }
        `}</style>
      </ul>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

export default function NextAuthClientComponent() {
  /**
   * TODO: 当登录完成退出登录后，其session信息不会自动更新，依然是登录前的信息？？
   */
  const { data: session, status } = useSession({
    required: false,
  });

  // 可以添加 effect 来监听 session 变化
  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);
  }, [status, session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>未登录</div>;
  }
  return (
    <div>
      <p>status: {status}</p>
      <Profile session={session} />
    </div>
  );
}
