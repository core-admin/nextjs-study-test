'use server';

import { redirect } from 'next/navigation';
import { addNote, updateNote, delNote } from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { sleep } from '@/lib/utils';

/*

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

*/

/*
export async function saveNote(formData) {
  await sleep(1000);
  const data = JSON.stringify({
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date(),
  });

  const noteId = formData.get('noteId');

  if (noteId) {
    updateNote(noteId, data);
    redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(data);
    redirect(`/note/${res}`);
  }
}

export async function deleteNote(formData) {
  await sleep(1000);
  const noteId = formData.get('noteId');
  delNote(noteId);
  redirect('/');
}
*/

const schema = z.object({
  // 注意 只有 z.string() 时，空字符串是匹配规则的。
  title: z.string().min(1, '请填写标题').max(30, '标题最多 30 个字符'),
  content: z.string().min(1, '请填写内容').max(100, '字数最多 100'),
});

export async function saveNote(prevState, formData) {
  const data = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date(),
  };

  // 校验数据
  const validated = schema.safeParse(data);
  console.log('data >>>', data);
  console.log('validated >>>', validated);
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    };
  }

  await sleep(1000);

  const noteId = formData.get('noteId');

  if (noteId) {
    updateNote(noteId, JSON.stringify(data));
    // redirect(`/note/${noteId}`);
    revalidatePath('/', 'layout');
  } else {
    const res = await addNote(JSON.stringify(data));
    // redirect(`/note/${res}`);
    revalidatePath('/', 'layout');
  }

  return {
    message: '保存成功',
  };
}

export async function deleteNote(prevState, formData) {
  await sleep(1000);
  const noteId = formData.get('noteId');
  delNote(noteId);
  redirect('/');
}
