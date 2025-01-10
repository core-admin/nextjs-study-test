import { getAllNotes } from '@/lib/redis';
import { sleep } from '@/lib/utils';
import NoteListFilter from './NoteListFilter';
import NoteItemHeader from './NoteItemHeader';
import { useTranslation } from '@/i18n';

export default async function SidebarNoteList({ lng }) {
  const { t } = await useTranslation(lng, 'note');
  await sleep(2000);
  const notes = await getAllNotes();

  if (!notes.length) {
    return <div className="notes-empty">{t('empty')}</div>;
  }

  return (
    <NoteListFilter
      lng={lng}
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
