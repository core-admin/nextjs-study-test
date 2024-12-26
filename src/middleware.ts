import { cookies } from 'next/headers';
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { RateLimiter } from 'limiter';
import {
  createMiddleware,
  type MiddlewareFunction,
  type MiddlewareFunctionProps,
  type MiddlewareConfig,
} from '@rescale/nemo';

export const config = {
  matcher: [
    // 排除静态资源和 API 路由
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API 路由
    '/(api|trpc)(.*)',
  ],
};

// ------------------------------------------------------------------------------------------

/**
 * test1 重定向
 */
export function redirectTest(request: NextRequest) {
  if (request.nextUrl.pathname === '/test/1') {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/test/1', request.url));
}

// ------------------------------------------------------------------------------------------

export function cookieTest(request: NextRequest) {
  console.log(request.nextUrl);

  const cookie = cookies();
  const cookieList = cookie.getAll();

  console.log('cookieList >>>', cookieList, request.cookies.getAll());

  const response = NextResponse.next();
  response.cookies.set('nextjs', '123');
  response.cookies.set({
    // cookie 的名称
    name: 'vercel',
    // cookie 的值
    value: 'fast',
    // 指定 cookie 在哪些路径下可用，默认 "/"
    path: '/',
    // 指定 cookie 在哪些域名下可用
    domain: request.nextUrl.origin,
    /**
     * cookie 的过期时间 7 天
     * 其值为具体日期
     */
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),

    /**
     * maxAge是cookie的存活时间（单位为秒）
     * expires 和 maxAge 可以同时存在时，但没必要，maxAge 更常用，因为它是相对时间，更容易维护
     * 如果同时存在，maxAge 优先级更高
     */
    maxAge: 60 * 60 * 24 * 7,
    // 指定 cookie 是否仅通过 HTTPS 传输
    secure: false,
    // 设为 true 时，JavaScript 无法读取 cookie，防止 XSS 攻击
    httpOnly: true,
    /**
     * 控制跨站点请求时 cookie 的发送
     *
     *  - lax: 默认值，允许部分跨站请求携带 cookie：✅ GET 请求、✅ <a> 链接跳转、✅ <link rel="prerender">
     *         ❌ POST 表单、❌ iframe、❌ AJAX、❌ Image
     *
     *  -  strict（最严格）: 完全禁止跨站发送 cookie，只有当前网站发起的请求才会带上 cookie
     *  - none（最宽松）: 允许所有跨站请求携带 cookie，必须配合 secure: true 使用（只在 HTTPS 下生效），使用场景为，需要跨站共享状态的第三方服务
     */
    sameSite: 'lax',
  });
  return response;
}

// ------------------------------------------------------------------------------------------

export function headerTest(request: NextRequest) {
  // 克隆请求头
  const headers = new Headers(request.headers);
  headers.set('custom-header-1', '123');
  headers.set('custom-header-2', '456');

  const response = NextResponse.next({
    request: {
      headers: headers,
    },
  });

  /**
   * 通过 nextResponse.next 方法设置的请求头，在 response 中是获取不到的
   * 在 nextResponse.next 方法中设置的请求头，其目的是传递给下一个处理请求的中间件或路由处理程序
   */
  console.log(
    'response headers 1 and 2 >>>',
    response.headers.get('custom-header-1'), // null
    response.headers.get('custom-header-2'), // null
  );

  // 通过 response 设置（设置新响应头）
  response.headers.set('custom-header-3', '789');
  response.headers.set('custom-header-4', '101');

  return response;
}

// ------------------------------------------------------------------------------------------

export function corsTest(request: NextRequest) {
  /**
   * Access-Control-Allow-Origin 允许的来源，指定允许访问该资源的域名
   *  - 值: * 或具体域名如 https://example.com
   *  - 注意: 如果设置 Credentials: true，这里不能用 *
   */
  const allowedOrigins = ['http://localhost:3000'];

  /**
   * Access-Control-Allow-Methods 允许的请求方法
   * Access-Control-Allow-Headers 允许的请求头
   */
  const corsOptions = {
    /**
     * Access-Control-Allow-Methods 允许的请求方法
     * 指定允许的 HTTP 请求方法
     */
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    /**
     * Access-Control-Allow-Headers 允许的请求头
     * 指定允许的请求头字段
     */
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    /**
     * Access-Control-Allow-Credentials 是否允许发送 Cookie（允许发送身份凭证）
     * 指定是否允许发送 Cookie
     */
    'Access-Control-Allow-Credentials': 'true',
  };

  /**
   * Origin 头部字段用于指示发起请求的源（origin）
   * Origin: <scheme>://<host>:<port> >>> Origin: https://example.com:443
   * Origin 头部允许服务器验证请求的来源。这对于防止 CSRF（跨站请求伪造）攻击非常重要，因为服务器可以检查请求的源是否在允许的来源列表中。
   *
   * cors: 当浏览器发起跨域请求时（例如，使用 XMLHttpRequest 或 Fetch API），Origin 头部会被自动添加。
   * 服务器可以根据这个头部决定是否允许该请求。
   * 如果允许，服务器会在响应中添加适当的 CORS 头部（如 Access-Control-Allow-Origin），以告知浏览器可以共享资源。
   *
   * Origin头字段可能为空，同源请求时，浏览器通常不会发送 origin 头，亦或者 浏览器地址栏url、非浏览器请求如postman/curl等工具，
   * 或者服务端发起的请求，origin 头为空。
   *
   */
  const origin = request.headers.get('origin') ?? '';

  const isAllowedOrigin = allowedOrigins.includes(origin);
  const isPreflightRequest = request.method === 'OPTIONS';

  if (isPreflightRequest) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    };
    return NextResponse.json(
      {},
      {
        status: 200,
        headers: preflightHeaders,
      },
    );
  }

  const response = NextResponse.next();
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  return response;
}

// ------------------------------------------------------------------------------------------

const limiter = new RateLimiter({ tokensPerInterval: 3, interval: 'min', fireImmediately: true });

async function chatRateLimiter(request: NextRequest) {
  const remaining = await limiter.removeTokens(1);

  if (remaining < 0) {
    return NextResponse.json({ error: '请求太频繁，请稍后再试' }, { status: 429 });
  }

  return NextResponse.next();
}

export function limiterMiddlewareTest(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 在中间件中，针对 /api/chat1 进行限流
  if (pathname.startsWith('/api/chat1')) {
    return chatRateLimiter(request);
  }

  return NextResponse.next();
}

// ------------------------------------------------------------------------------------------

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

/**
 * 使用中间件堆栈方案（更灵活的自定义方案）
 * stackMiddlewares([chatRateLimiter, globalApiMiddleware])
 */
export function stackMiddlewares(functions: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}

/**
 * 使用 multipleMiddlewares 工具函数（支持异步中间件）
 * multipleMiddlewares([chatRateLimiter, globalApiMiddleware])
 *
 * 优点：
 *  - 实现简单直观
 *  - 支持异步中间件
 *  - 性能开销小
 *
 * 缺点：
 *  - 不支持中间件间的请求头传递
 *  - 不支持重定向和重写URL的场景
 *  - 功能过于简单
 */
export function multipleMiddlewares(
  middlewares: ((
    req: NextRequest,
    event?: NextFetchEvent,
    response?: NextResponse,
  ) => NextResponse | Promise<NextResponse>)[],
) {
  return async (req: NextRequest, event?: NextFetchEvent, response?: NextResponse) => {
    // 执行中间件链
    for (const middleware of middlewares) {
      const result = await middleware(req, event, response);
      if (!result.ok) return result;
    }
    return NextResponse.next();
  };
}

/**
 * @example multipleMiddlewares([chatRateLimiter, globalApiMiddleware])
 *
 * 优点：
 *  - 完整支持中间件间的请求头传递
 *  - 支持重定向和URL重写
 *  - 处理了更多边界情况
 *
 * 缺点：
 *  - 实现复杂
 */
function multipleMiddlewares2(
  middlewares: ((
    req: NextRequest,
    event?: NextFetchEvent,
    response?: NextResponse,
  ) => NextResponse | Promise<NextResponse>)[],
) {
  return async (req: NextRequest, event?: NextFetchEvent, response?: NextResponse) => {
    // 存储所有中间件的响应头信息
    const middlewareHeader = [];

    // 依次执行每个中间件
    for (const middleware of middlewares) {
      const result = await middleware(req, event, response);

      // 如果中间件返回非成功状态，直接返回结果（中断中间件链）
      if (!result.ok) {
        return result;
      }

      // 收集每个中间件的响应头
      middlewareHeader.push(result.headers);
    }

    // 用于合并所有中间件的响应头，主要用于检测重定向和重写URL的特殊头部
    const mergedHeaders = new Headers();

    // 存储需要传递给下一个请求的自定义头部
    // 这些头部会被添加到最终的请求中
    const transmittedHeaders = new Headers();

    // 合并所有中间件的响应头
    middlewareHeader.forEach(header => {
      for (const [key, value] of Array.from(header.entries())) {
        // 将所有头部添加到合并头部中
        mergedHeaders.append(key, value);

        // 检查是否是中间件特定的请求头
        // Next.js 使用 x-middleware-request- 前缀来标识这些特殊头部
        if (key.startsWith('x-middleware-request-')) {
          // 移除特殊前缀，获取原始的头部名称
          const fixedKey = key.replace('x-middleware-request-', '');
          // 将处理后的头部添加到传递头部集合中
          transmittedHeaders.append(fixedKey, value);
        }
      }
    });

    // 检查是否需要重定向
    // Next.js 使用 x-middleware-request-redirect 头部来标识重定向
    const redirect = mergedHeaders.get('x-middleware-request-redirect');
    if (redirect) {
      // 执行重定向，使用 307 临时重定向状态码
      return NextResponse.redirect(new URL(redirect, req.url), {
        status: 307,
      });
    }

    // 检查是否需要重写URL
    // Next.js 使用 x-middleware-rewrite 头部来标识URL重写
    const rewrite = mergedHeaders.get('x-middleware-rewrite');
    if (rewrite) {
      // 执行URL重写，同时传递收集的自定义头部
      return NextResponse.rewrite(new URL(rewrite, req.url), {
        request: {
          headers: transmittedHeaders,
        },
      });
    }

    // 如果没有特殊处理，则继续正常请求
    // 将收集的自定义头部添加到请求中
    return NextResponse.next({
      request: {
        headers: transmittedHeaders,
      },
    });
  };
}

// ------------------------------------------------------------------------------------------

// export function middleware(request: NextRequest) {}

/**
 * 在 Next.js 中，如果你在某个路由（例如 /api/limiter/off）的中间件中执行了响应，
 * 比如调用 NextResponse.json({ data: 'limiter/off' })，
 * 那么中间件的生命周期就会结束，后续的中间件将不会被执行。
 *
 * 比如：
 * async before() {
 *   return NextResponse.json({ data: 'globalMiddlewares before fn run' });
 * }
 *
 * 任何请求都将是500，因为它是一个全局的，且只要响应了，中间件生命周期已经结束，响应的数据会返回给客户端
 */

const globalMiddlewares: {
  before: MiddlewareFunction;
  after: MiddlewareFunction;
} = {
  async before({ request, context }: MiddlewareFunctionProps) {
    console.log('<<< globalMiddlewares before fn run >>>');

    // return NextResponse.json({ data: 'globalMiddlewares before fn run' });
  },
  async after() {
    console.log('<<< globalMiddlewares after fn run >>>');
  },
};

const middlewares: MiddlewareConfig = {
  '/api/limiter/on': async ({ request, response }: MiddlewareFunctionProps) => {
    console.log('<<< middlewares /api/limiter/on fn run >>>');

    const remaining = await limiter.removeTokens(1);

    if (remaining < 0) {
      return NextResponse.json({ error: '请求太频繁，请稍后再试' }, { status: 429 });
    }

    return NextResponse.next();
  },
  '/api/limiter/off': async ({ request, response }: MiddlewareFunctionProps) => {
    console.log('<<< middlewares /api/limiter/off fn run >>>');
    return NextResponse.next();
  },
};

export const middleware = createMiddleware(middlewares, globalMiddlewares);

// createMiddleware(() => {}, {
//   before: () =>
// })

// ------------------------------------------------------------------------------------------

/*

  ---------------------------- request.nextUrl ----------------------------
  {
    href: 'http://localhost:3000/api/test',
    origin: 'http://localhost:3000',
    protocol: 'http:',
    username: '',
    password: '',
    host: 'localhost:3000',
    hostname: 'localhost',
    port: '3000',
    pathname: '/api/test',
    search: '',
    searchParams: URLSearchParams {  },
    hash: ''
  }

  ---------------------------- request.url ----------------------------

*/

/*

  ---------------------------- 设置 CORS 头 ----------------------------

  export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    
    允许的来源
    response.headers.set('Access-Control-Allow-Origin', '*');
    允许的请求方法
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    允许的请求头
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    允许发送身份凭证（cookies等）
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    预检请求的缓存时间（秒）
    response.headers.set('Access-Control-Max-Age', '86400');

    允许客户端访问的响应头
    response.headers.set('Access-Control-Expose-Headers', 'Content-Length');

    return response;
  }

  ---------------------------- 设置 CORS 头 ----------------------------

*/
