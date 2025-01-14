'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

export async function action(formData) {
  try {
    await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
      callbackUrl: formData.get('callbackUrl') || '/',

      // 登录失败时会带上 error 参数重定向回登录页，如：
      // errorRedirect: '/auth/signin?error=InvalidCredentials',
      // errorRedirect: '/auth/signin',
    });

    redirect(formData.get('callbackUrl') || '/');
  } catch (error) {
    console.log('error >>>', error);

    // 登录失败，重定向到登录页面并带上错误信息
    redirect(
      '/auth/signin?error=' + encodeURIComponent(error.cause?.err?.message ?? error.message),
    );
  }
}
