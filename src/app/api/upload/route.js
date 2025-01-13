import { stat, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import mime from 'mime';
import dayjs from 'dayjs';
import { addNote } from '@/lib/redis';

export async function POST(req) {
  const formData = await req.formData();
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
     * 清除缓存
     *
     * 注意：revalidatePath 此处是清除了服务端缓存，它并不能影响客户端本身的路由缓存。
     * 此处非Server Action，想要清除客户端缓存，需要在客户端中使用 router.refresh() 来清除。
     *
     * Server Action清除缓存方式：
     *  1. revalidatePath('/', 'layout');
     *  2. revalidateTag('tag');
     *  3. 使用 cookies.set / cookies.delete 会使路由缓存失效，这是为了防止使用 cookie 的路由过时（如身份验证）
     */
    revalidatePath('/', 'layout');

    return NextResponse.json({
      fileUrl: `/${relativeUploadDir}/${uniqueFilename}`,
      uid: res,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
