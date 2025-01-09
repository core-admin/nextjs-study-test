import NoteItem from './NoteItem';
import { getAllNotes } from '@/lib/redis';

const sleep = ms => new Promise(r => setTimeout(r, ms));

export default async function SidebarNoteList() {
  await sleep(2000);
  const notes = await getAllNotes();
  const arr = Object.entries(notes);

  if (!arr.length) {
    return <div className="notes-empty">{'尚未创建任何笔记'}</div>;
  }

  return (
    <ul className="notes-list">
      {arr.map(([noteId, note]) => {
        return (
          <li key={noteId}>
            <NoteItem noteId={noteId} note={JSON.parse(note)} />
          </li>
        );
      })}
    </ul>
  );
}
