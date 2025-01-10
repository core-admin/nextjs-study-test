import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { locales, defaultLocale } from '@/config';
import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    // 排除静态资源和 API 路由
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API 路由
    '/(api|trpc)(.*)',
  ],
};

function getLocale(request) {
  const headers = {
    'accept-language': request.headers.get('accept-language'),
  };
  // 解析请求头中的语言，根据浏览器的首选设置来判断的
  const negotiator = new Negotiator({ headers });
  // 匹配语言
  return match(negotiator.languages(), locales, defaultLocale);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  /**
   * 判断请求路径中是否已经包含语言，如果包含，则跳过处理
   */
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}`));
  if (pathnameHasLocale) {
    return;
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // 默认语言不重定向，改为重写，这样url不会改变，但路由会匹配实际的文件夹文件
  if (locale === defaultLocale) {
    return NextResponse.rewrite(request.nextUrl);
  }
  return NextResponse.redirect(request.nextUrl);
}
