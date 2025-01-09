'use server';

import { redirect } from 'next/navigation';
import { addNote, updateNote, delNote } from '@/lib/redis';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function saveNote(noteId, title, body) {
  await sleep(1000);
  const data = JSON.stringify({
    title,
    content: body,
    updateTime: new Date(),
  });

  if (noteId) {
    updateNote(noteId, data);
    redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(data);
    redirect(`/note/${res}`);
  }
}

export async function deleteNote(noteId) {
  await sleep(1000);
  delNote(noteId);
  redirect('/');
}
