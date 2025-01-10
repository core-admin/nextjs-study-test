import { Suspense } from 'react';
import Link from 'next/link';
import NoteList from './NoteList';
import EditButton from './EditButton';
import NoteListSkeleton from './NoteListSkeleton';
import SidebarSearchField from './SidebarSearchField';
import { useTranslation } from '@/i18n';

export default async function Sidebar({ lng }) {
  const { t: tBasic } = await useTranslation(lng, 'basic');
  const { t: tNote } = await useTranslation(lng, 'note');
  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src="/logo.svg"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>{tBasic('title')}</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField lng={lng} />
          <EditButton noteId={null}>{tNote('new')}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <NoteList lng={lng} />
          </Suspense>
        </nav>
      </section>
    </>
  );
}
