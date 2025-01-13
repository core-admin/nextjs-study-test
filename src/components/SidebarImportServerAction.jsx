'use client';

import { useRouter } from 'next/navigation';
import { importNote } from '@/app/actions';

export default function SidebarImport() {
  const router = useRouter();

  const onChange = async e => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      const data = await importNote(formData);
      router.push(`/note/${data.uid}`);
      // 在 Server Actions 中调用 revalidatePath 会清除路由缓存，所以我们也不需要再调用 router.refresh()。
    } catch (error) {
      console.error('something went wrong');
    }

    // 重置 file input
    e.target.type = 'text';
    e.target.type = 'file';
  };

  return (
    // <form method="post" encType="multipart/form-data">

    // </form>

    <button
      style={{
        fontSize: '12px',
        border: 'none',
        borderRadius: '4px',
        padding: '4px 8px',
        cursor: 'pointer',
        backgroundColor: 'var(--primary-blue)',
        color: 'white',
      }}
    >
      <label htmlFor="file" style={{ cursor: 'pointer' }}>
        import .md (server action)
      </label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".md"
        style={{ position: 'absolute', clip: 'rect(0 0 0 0)' }}
        onChange={onChange}
      />
    </button>
  );
}
