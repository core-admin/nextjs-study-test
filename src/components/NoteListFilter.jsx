'use client';

import { useSearchParams } from 'next/navigation';
import NoteItemContent from './NoteItemContent';

export default function NoteListFilter({ notes, lng }) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get('q');

  const filteredNotes = notes.filter(noteItem => {
    if (!searchText) {
      return true;
    }
    return noteItem.note.title.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <ul className="notes-list">
      {filteredNotes.map(noteItem => {
        const { noteId, note, header } = noteItem;
        return (
          <li key={noteId}>
            <NoteItemContent
              id={noteId}
              lng={lng}
              title={note.title}
              expandedChildren={
                <p className="sidebar-note-excerpt">
                  {note.content?.substring(0, 20) || <i>(No content)</i>}
                </p>
              }
            >
              {header}
            </NoteItemContent>
          </li>
        );
      })}
    </ul>
  );
}
