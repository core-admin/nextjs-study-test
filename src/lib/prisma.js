import { auth } from '@/auth';
import { db } from '@/db/db';

/*
  data: { username, password, notes: { create: [] } }
  与
  data: { username, password, notes: [] }
  的区别：

  根据 schema 定义，notes 是一个可选的关联字段（Note[]）
  当不指定 notes 字段时，Prisma 默认会创建一个空的关联
  写法1中的 notes: { create: [] } 显式地创建了一个空数组，但结果与默认行为相同

  所以可以直接使用写法2，更简洁。只有当你需要在创建用户的同时创建关联的 notes 时，才需要使用 notes 字段，例如：
  notes: { create: [{ title: 'Note 1' }, { title: 'Note 2' }] }

  在 Prisma 中，对于关系字段（如 notes），你不能直接赋值一个数组。必须使用 Prisma 提供的关系操作符，比如 create、connect、set 等。

  创建空关联
  data: { username, password, notes: { create: [] } }

  或者完全不指定 notes 字段
  data: { username, password }

  如果你想在创建用户时关联已存在的 notes，应该使用 connect：
  notes: { connect: [{ id: 'noteId1' }, { id: 'noteId2' }] }

  直接使用 notes: [] 会导致 Prisma 报错，因为它不知道如何处理这个原始数组。
*/

export async function createUser(username, password) {
  const user = await db.user.create({
    data: {
      username,
      password,
      notes: {
        create: [],
      },
    },
  });
  return {
    name: user.username,
    username,
    userId: user.id,
  };
}

export async function getUser(username, password) {
  const user = await db.user.findFirst({
    where: {
      username,
    },
    include: {
      notes: true,
    },
  });
  if (!user) {
    return 0;
  }
  if (user.password !== password) {
    return 1;
  }

  return {
    name: user.username + ' __ ' + 'name',
    username: user.username + ' __ ' + 'username',
    userId: user.id,
  };
}

export async function getAllNotes() {
  const session = await auth();
  if (!session) {
    return [];
  }

  const notes = await db.note.findMany({
    where: {
      authorId: session.user.userId,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
      {
        updatedAt: 'desc',
      },
    ],
  });

  return notes.map(v => {
    return {
      uuid: v.id,
      title: v.title,
      content: v.content,
      updateTime: v.updatedAt || v.createdAt,
      authorId: v.authorId,
    };
  });
}

export async function addNote(data) {
  const session = await auth();
  if (!session) {
    throw new Error('用户未登录');
  }
  try {
    data = JSON.parse(data);

    // 验证必要字段
    if (!data?.title) {
      throw new Error('标题不能为空');
    }

    const result = await db.note.create({
      data: {
        title: data.title,
        content: data.content || '', // 提供默认值
        authorId: session.user.userId,
      },
    });
    return result.id;
  } catch (error) {
    console.error('创建笔记失败:', error);
    throw new Error(error.message || '创建笔记失败');
  }
}

export async function updateNote(uuid, data) {
  const session = await auth();
  if (!session) {
    throw new Error('用户未登录');
  }
  data = JSON.parse(data);
  const result = await db.note.update({
    where: { id: uuid },
    data: {
      title: data.title,
      content: data.content,
    },
  });
  return result.id;
}

export async function getNote(uuid) {
  const session = await auth();
  if (!session) {
    return null;
  }
  const result = await db.note.findFirst({
    where: { id: uuid },
  });
  if (!result) {
    return null;
  }
  return {
    title: result.title,
    content: result.content,
    updateTime: result.updatedAt || result.createdAt,
    authorId: result.authorId,
    id: result.id,
  };
}

export async function delNote(uuid) {
  const session = await auth();
  if (!session) {
    throw new Error('用户未登录');
  }
  await db.note.delete({ where: { id: uuid } });
}
