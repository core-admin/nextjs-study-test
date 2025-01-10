import NoteItem from './NoteItem';
import { getAllNotes } from '@/lib/redis';
import { sleep } from '@/lib/utils';

export default async function SidebarNoteList() {
  await sleep(2000);
  const notes = await getAllNotes();

  if (!notes.length) {
    return <div className="notes-empty">{'尚未创建任何笔记'}</div>;
  }

  return (
    <ul className="notes-list">
      {notes.map(note => {
        return (
          <li key={note.uuid}>
            <NoteItem noteId={note.uuid} note={note} />
          </li>
        );
      })}
    </ul>
  );
}
