import { Suspense } from 'react';
import Link from 'next/link';
import NoteList from './NoteList';
import EditButton from './EditButton';
import NoteListSkeleton from './NoteListSkeleton';

export default async function Sidebar() {
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
            <strong>笔记📒</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <EditButton noteId={null}>新建</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <NoteList />
          </Suspense>
        </nav>
      </section>
    </>
  );
}
