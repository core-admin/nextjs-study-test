// import { getAllNotes } from '@/lib/redis';
import { getAllNotes } from '@/lib/prisma';
import NoteListFilter from './NoteListFilter';
import NoteItemHeader from './NoteItemHeader';

export default async function SidebarNoteList() {
  const notes = await getAllNotes();

  if (!notes.length) {
    return <div className="notes-empty">{'尚未创建任何笔记'}</div>;
  }

  return (
    <NoteListFilter
      notes={notes.map(note => {
        return {
          noteId: note.uuid,
          note,
          header: <NoteItemHeader title={note.title} updateTime={note.updateTime} />,
        };
      })}
    />
  );
}
