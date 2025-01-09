import Redis from 'ioredis';

const redis = new Redis();

const initialData = {
  1702459181837:
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459182837:
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459188837:
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

export async function getAllNotes() {
  const data = await redis.hgetall('notes');
  if (Object.keys(data).length == 0) {
    await redis.hset('notes', initialData);
    const res = await redis.hgetall('notes');
    return Object.entries(res).map(([uuid, noteStr]) => ({
      uuid: parseInt(uuid),
      ...JSON.parse(noteStr),
    }));
  }

  // 将数据转换为对象数组并解析 JSON
  const notes = Object.entries(data).map(([uuid, noteStr]) => ({
    uuid: parseInt(uuid),
    ...JSON.parse(noteStr),
  }));

  // 先按创建时间 (uuid) 降序，再按更新时间降序排序
  notes.sort((a, b) => {
    const updateTimeA = a.updateTime ? new Date(a.updateTime).getTime() : a.uuid;
    const updateTimeB = b.updateTime ? new Date(b.updateTime).getTime() : b.uuid;
    return updateTimeB - updateTimeA;
  });

  return notes;
}

export async function addNote(data) {
  const uuid = Date.now().toString();
  await redis.hset('notes', [uuid], data);
  return uuid;
}

export async function updateNote(uuid, data) {
  await redis.hset('notes', [uuid], data);
}

export async function getNote(uuid) {
  return JSON.parse(await redis.hget('notes', uuid));
}

export async function delNote(uuid) {
  return redis.hdel('notes', uuid);
}

export default redis;
