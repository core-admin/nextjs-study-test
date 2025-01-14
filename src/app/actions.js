'use server';

import { redirect } from 'next/navigation';
// import { addNote, updateNote, delNote } from '@/lib/redis';
import { addNote, updateNote, delNote } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { sleep } from '@/lib/utils';
import { stat, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import mime from 'mime';
import dayjs from 'dayjs';

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

export async function importNote(formData) {
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const relativeUploadDir = join('uploads', `${dayjs().format('YYYY-MM-DD')}`);
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

  try {
    // 检查目录是否存在
    await stat(uploadDir);
  } catch (e) {
    if (e.code === 'ENOENT') {
      // 如果目录不存在，创建它
      await mkdir(uploadDir, { recursive: true });
    } else {
      return NextResponse.json({ error: 'Failed to create upload directory' }, { status: 500 });
    }
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());

  try {
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, '');
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(file.type)}`;

    await writeFile(`${uploadDir}/${uniqueFilename}`, fileBuffer);

    const res = await addNote(
      JSON.stringify({
        // 笔记标题
        title: filename,
        // 笔记内容
        content: fileBuffer.toString('utf-8'),
      }),
    );
    /**
     * 清除缓存，同时清除客户端缓存
     */
    revalidatePath('/', 'layout');

    return {
      fileUrl: `/${relativeUploadDir}/${uniqueFilename}`,
      uid: res,
    };
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
