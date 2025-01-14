'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import { CSSstring } from '@/lib/utils';

export default function SignIn({ searchParams }) {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const initToken = async () => {
      const response = await fetch('http://localhost:3000/api/auth/csrf');
      const { csrfToken } = await response.json();
      setCsrfToken(csrfToken);
    };
    initToken();
  }, []);

  const { callbackUrl } = use(searchParams);

  return (
    <div className="page">
      <div className="signin">
        <div className="card">
          <div className="provider">
            <form action="/api/auth/signin/credentials" method="POST">
              <input type="hidden" name="csrfToken" value={csrfToken} />
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
              <button
                type="submit"
                className="button"
                style={CSSstring(
                  '--provider-bg: #fff; --provider-bg-hover: color-mix(in srgb, #24292f 30%, #fff); --provider-dark-bg: #161b22; --provider-dark-bg-hover: color-mix(in srgb, #24292f 30%, #000);',
                )}
              >
                <span
                  style={CSSstring(
                    'filter: invert(1) grayscale(1) brightness(1.3) contrast(9000); mix-blend-mode: luminosity; opacity: 0.95;',
                  )}
                >
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
          position: fixed;
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          left: 0;
          top: 0;
          background-color: white;
          z-index: 1000;
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
