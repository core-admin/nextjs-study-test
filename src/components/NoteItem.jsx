import NoteItemContent from './NoteItemContent';
import NoteItemHeader from './NoteItemHeader';

export default function NoteItem({ noteId, note }) {
  const { title, content = '', updateTime } = note;

  return (
    <NoteItemContent
      id={noteId}
      title={title}
      expandedChildren={
        <p className="sidebar-note-excerpt">{content?.substring(0, 20) || <i>(No content)</i>}</p>
      }
    >
      <NoteItemHeader title={title} updateTime={updateTime} />
    </NoteItemContent>
  );
}
