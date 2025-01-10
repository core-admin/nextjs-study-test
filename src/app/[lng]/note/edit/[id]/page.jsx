import NoteEditor from '@/components/NoteEditor';
import { getNote } from '@/lib/redis';
import { sleep } from '@/lib/utils';

export default async function EditPage({ params }) {
  const { id: noteId } = await params;
  const note = await getNote(noteId);

  await sleep(1000);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">单击左侧的笔记即可查看内容！🥺</span>
      </div>
    );
  }

  return <NoteEditor noteId={noteId} initialTitle={note.title} initialBody={note.content} />;
}
