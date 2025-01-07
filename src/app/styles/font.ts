import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['sans-serif', 'arial'],
});

// 细体
export const lxgwWenKaiLightFont = localFont({
  src: './fonts/LXGWWenKai-Light.ttf',
  weight: '300',
  style: 'normal',
  variable: '--font-lxgw-wen-kai-light',
  display: 'swap',
});

// 常规
export const lxgwWenKaiRegularFont = localFont({
  src: './fonts/LXGWWenKai-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-lxgw-wen-kai-regular',
  display: 'swap',
});

// 中黑
export const lxgwWenKaiMediumFont = localFont({
  src: './fonts/LXGWWenKai-Medium.ttf',
  weight: '500',
  style: 'normal',
  variable: '--font-lxgw-wen-kai-medium',
  display: 'swap',
});

export const fontFamilyClassName = [
  inter.variable,
  lxgwWenKaiLightFont.variable,
  lxgwWenKaiRegularFont.variable,
  lxgwWenKaiMediumFont.variable,
];
