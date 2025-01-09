'use client';

import { useState } from 'react';
import NotePreview from '@/components/NotePreview';
import { useFormStatus } from 'react-dom';
import { saveNote, deleteNote } from '@/app/actions';

export default function NoteEditor({ noteId, initialTitle, initialBody }) {
  const { pending } = useFormStatus();
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isDraft = !noteId;

  console.log('pending >>>', pending);

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <div className="note-editor-menu" role="menubar">
          <input type="hidden" name="noteId" value={noteId} />
          <button
            className="note-editor-done"
            style={{
              cursor: pending ? 'not-allowed' : 'pointer',
            }}
            disabled={pending}
            type="submit"
            role="menuitem"
            formAction={saveNote}
            // formAction={() => saveNote(noteId, title, body)}
          >
            <img src="/checkmark.svg" width="14px" height="10px" alt="" role="presentation" />
            保存
          </button>
          {!isDraft && (
            <button
              className="note-editor-delete"
              style={{
                cursor: pending ? 'not-allowed' : 'pointer',
              }}
              disabled={pending}
              role="menuitem"
              // formAction={() => deleteNote(noteId)}
              formAction={deleteNote}
            >
              <img src="/cross.svg" width="10px" height="10px" alt="" role="presentation" />
              删除
            </button>
          )}
        </div>

        <label className="offscreen" htmlFor="note-title-input">
          输入笔记的标题
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          输入笔记正文
        </label>
        <textarea
          name="body"
          value={body}
          id="note-body-input"
          onChange={e => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          预览
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}
