import { PrismaClient } from '@prisma/client';

const createPrismaClient = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : [],
  });

export const db = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

/**
 * 相关资料：
 *
 * 防止热重载创建新的 PrismaClient：https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
 * globalThis不能识别问题： https://github.com/eslint/eslint/issues/15199#issuecomment-948724014
 * globalThis类型问题：https://github.com/nextauthjs/next-auth/issues/824
 */
