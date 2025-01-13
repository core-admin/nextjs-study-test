'use client';

import { use } from 'react';

export default async function SignIn({ searchParams }) {
  const response = await fetch('/api/auth/csrf');
  const { csrfToken } = await response.json();
  const data = use(searchParams);

  console.log('callbackUrl >>>', data);

  return (
    <div className="page">
      <div className="signin">
        <div className="card">
          <div className="provider">
            <form action="/api/auth/signin/github" method="POST">
              <input type="hidden" name="csrfToken" value={csrfToken} />
              {/* <input type="hidden" name="callbackUrl" value={searchParams.callbackUrl} /> */}
              <button
                type="submit"
                class="button"
                style="--provider-bg: #fff; --provider-bg-hover: color-mix(in srgb, #24292f 30%, #fff); --provider-dark-bg: #161b22; --provider-dark-bg-hover: color-mix(in srgb, #24292f 30%, #000);"
                tabindex="0"
              >
                <span style="filter: invert(1) grayscale(1) brightness(1.3) contrast(9000); mix-blend-mode: luminosity; opacity: 0.95;">
                  使用 GitHub 登录
                </span>
                <img loading="lazy" height="24" src="https://authjs.dev/img/providers/github.svg" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .page {
          position: absolute;
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .page > div {
          text-align: center;
        }
        .signin > div,
        .signin form {
          display: block;
        }
        .card {
          background-color: var(--color-background-card);
          border-radius: 1rem;
          padding: 1.25rem 2rem;
        }
        .signin > div input[type],
        .signin form input[type] {
          margin-bottom: 0.5rem;
        }

        .signin > div button,
        .signin form button {
          width: 100%;
        }

        .signin .provider + .provider {
          margin-top: 1rem;
        }
        @media screen and (min-width: 450px) {
          .card {
            margin: 2rem 0;
            width: 368px;
          }
        }

        @media screen and (max-width: 450px) {
          .card {
            margin: 1rem 0;
            width: 343px;
          }
        }
      `}</style>
    </div>
  );
}
