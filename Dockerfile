FROM node:18-alpine AS base

# ---------------------------------------------

FROM base AS deps

# Alpine Linux 的包管理器，类似于 Ubuntu 的 apt 或 CentOS 的 yum
# add - 安装包的命令
# --no-cache - 不保存下载的安装包缓存，可以减小镜像大小
# libc6-compat - 一个兼容库包，提供了 GNU C 库(glibc)的兼容层

# libc6-compat
#   - Alpine Linux 默认使用 musl libc 而不是更常见的 glibc
#   - 很多 Node.js 包含有原生模块是基于 glibc 编译的
#   - 安装 libc6-compat 可以让这些依赖 glibc 的 Node.js 模块正常工作
#   - 这是在 Node.js Alpine 镜像中的一个常见做法，特别是当你的项目依赖包含原生模块时。
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY ./prisma ./


# Dockerfile 中的一个 RUN 指令，用于安装项目依赖
# 支持多种包管理器（yarn/npm/pnpm）
# 强制使用锁文件，保证依赖版本一致性
# 如果没有锁文件则失败，避免潜在问题

# 基础镜像 node:18-alpine 已经包含了这些工具：
# - yarn - Node.js 官方镜像从 2017 年起就预装了 Yarn
# - pnpm - 通过 corepack 支持：
#   - Corepack 是 Node.js 16.13+ 的内置功能
#   - 它管理包管理器（yarn/pnpm）的版本
#   - corepack enable pnpm 会自动下载并启用 pnpm

RUN \
  # --frozen-lockfile - 确保安装版本严格匹配锁文件，如有不匹配则报错
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  # npm ci - 比 npm install 更严格更快的安装模式，完全根据 package-lock.json 安装
  elif [ -f package-lock.json ]; then npm ci; \
  # corepack enable pnpm - 启用 Node.js 内置的包管理器管理工具，使 pnpm 可用
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  # 如果锁文件不存在，则报错并退出
  else echo "Lockfile not found." && exit 1; \
  fi

# 

# ---------------------------------------------

# 开始新的构建阶段，使用前面定义的 base 镜像作为基础
FROM base AS builder

WORKDIR /app

# --from=deps - 从名为 deps 的前一个构建阶段复制文件，而不是从主机复制
# 将 deps 阶段中安装的 node_modules 复制到当前构建阶段的 /app 目录下
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# RUN echo "Current directory contents:" && ls -la

# 构建
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ---------------------------------------------

# 生成生产镜像，复制所有文件并运行下一步
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

# 创建系统级用户组 设置组 ID 为 1001
RUN addgroup --system --gid 1001 nodejs
# 创建系统级用户 设置用户 ID 为 1001
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next

# # 设置目录和文件的所有权
# 将 .next 目录的所有权给到 nextjs 用户和 nodejs 组
RUN chown nextjs:nodejs .next

# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
# 复制 Next.js 构建产物，同时设置所有权
# 复制独立运行所需文件
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# 复制静态资源
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到 nextjs 用户运行应用
USER nextjs

# --chown=nextjs:nodejs - 确保复制的文件归属于正确的用户和组，这样 nextjs 用户才有权限读写这些文件

EXPOSE 4001

ENV PORT=4001

# 修改 CMD 为 JSON 数组格式
CMD ["sh", "-c", "HOSTNAME=\"0.0.0.0\" node server.js"]


# run build >>>
# docker build -t nextjs-note . 2>&1 | tee build.log