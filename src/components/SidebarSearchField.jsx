'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useTranslation } from '@/i18n/client';

function Spinner({ active = true }) {
  return (
    <div
      className={['spinner', active && 'spinner--active'].join(' ')}
      role="progressbar"
      aria-busy={active ? 'true' : 'false'}
    />
  );
}

export default function SidebarSearchField({ lng }) {
  const { t } = useTranslation(lng, 'note');
  const { replace } = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const handleSearch = term => {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="search" role="search">
      <label className="offscreen" htmlFor="sidebar-search-input">
        {t('search')}
      </label>
      <input
        id="sidebar-search-input"
        placeholder={t('search')}
        type="text"
        onChange={e => handleSearch(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch(e.target.value);
          }
        }}
      />
      <Spinner active={isPending} />
    </div>
  );
}
