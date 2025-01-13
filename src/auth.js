import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith('/note/edit')) {
        return !!auth;
      }
      return true;
    },
  },
});
