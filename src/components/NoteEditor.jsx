'use client';

import { useState, useActionState, useEffect } from 'react';
import NotePreview from '@/components/NotePreview';
import { saveNote, deleteNote } from '@/app/[lng]/actions';
import SaveButton from '@/components/SaveButton';
import DeleteButton from '@/components/DeleteButton';

const initialState = {
  message: null,
  errors: null,
};

export default function NoteEditor({ noteId, initialTitle, initialBody }) {
  const [saveState, saveFormAction] = useActionState(saveNote, initialState);
  const [, delFormAction] = useActionState(deleteNote);

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  const isDraft = !noteId;

  useEffect(() => {
    if (saveState.errors) {
      // 处理错误
      console.error(saveState.errors);
    }
  }, [saveState]);

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <div className="note-editor-menu" role="menubar">
          <input type="hidden" name="noteId" value={noteId} />
          <SaveButton formAction={saveFormAction} />
          <DeleteButton isDraft={isDraft} formAction={delFormAction} />
        </div>
        <div className="note-editor-menu">
          {!!saveState?.message && `提示信息：${saveState.message}`}
          {!!saveState.errors && `错误信息：${saveState.errors[0].message}`}
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
