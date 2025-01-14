import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUser, createUser } from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    CredentialsProvider({
      // credentials 为 formData 提交的参数
      async authorize(credentials, req) {
        console.log('auth credentials >>>', credentials);

        if (!credentials.username || !credentials.password) {
          throw new Error('用户名或密码不能为空');
        }

        let user = await getUser(credentials.username, credentials.password);

        // 密码错误
        if (user === 1) {
          throw new Error('用户名或密码错误 1111111');
        }

        // 用户不存在，注册
        if (user === 0) {
          user = await createUser(credentials.username, credentials.password);
        }

        if (!user) {
          throw new Error('用户不存在');
        }

        return user;

        // return {
        //   name: credentials.username,
        //   email: 'xxx@example.com',
        //   image: 'https://github.com/gengshuai.png',
        // };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      console.log('authorized auth >>>', auth);

      const { pathname } = request.nextUrl;
      if (pathname.startsWith('/note/edit')) {
        return !!auth;
      }
      return true;
    },
    jwt(data) {
      /*
        {
          token: {
            name: '18366170580',
            email: 'xxx@example.com',
            picture: 'https://github.com/gengshuai.png',
            sub: 'b333a6d4-09f3-4bfc-83c9-0cc00de4ba81'
          },

          user 就是 authorize 返回的数据
          user: {
            name: '18366170580',
            email: 'xxx@example.com',
            image: 'https://github.com/gengshuai.png',
            id: 'b333a6d4-09f3-4bfc-83c9-0cc00de4ba81' // 此为自动生成的，如果没有在 authorize 返回此字段
          },
          account: {
            providerAccountId: 'b333a6d4-09f3-4bfc-83c9-0cc00de4ba81',
            type: 'credentials',
            provider: 'credentials'
          },
          isNewUser: false,
          trigger: 'signIn'
        }
      */
      console.log('jwt data >>>', data);

      if (data.account?.type === 'credentials' && data.user) {
        data.token.userId = data.user.userId;
      }
      return data.token;
    },
    session(data) {
      /*
        {
          session: {
            user: {
              name: '18366170580',
              email: 'xxx@example.com',
              image: 'https://github.com/gengshuai.png',
            },
            expires: '2025-02-13T07:14:50.266Z',
          },
          token: {
            name: '18366170580',
            email: 'xxx@example.com',
            picture: 'https://github.com/gengshuai.png',
            sub: 'a3d7dbdd-e132-45ef-8107-ea03950bea43',
            iat: 1736838890,
            exp: 1739430890,
            jti: '04730a10-689d-43fc-b7c2-a040e12efffa',
          },
        }
      */
      console.log('session data >>>', data);

      data.session.user.userId = data.token.userId;
      return data.session;
    },
  },
});
