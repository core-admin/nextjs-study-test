'use client';

import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';

export default function SidebarImport() {
  const router = useRouter();

  const onChange = async e => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }

    const file = fileInput.files[0];

    // const fileReader = new FileReader();
    // fileReader.readAsText(file);
    // fileReader.onload = () => {
    //   const fileContent = fileReader.result;
    //   console.log(fileContent);
    // };

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('something went wrong');
        router.refresh();
      }

      const data = await response.json();
      router.push(`/note/${data.uid}`);
      // 清除客户端缓存
      router.refresh();
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
        import .md (api)
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
