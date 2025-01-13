'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

export default function NoteItemContent({ id, title, expandedChildren, children }) {
  const router = useRouter();
  const { id: urlId } = useParams();
  const searchParams = useSearchParams();

  const [isPending] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = id == urlId;

  // Animate after title is edited.
  const itemRef = useRef(null);
  const prevTitleRef = useRef(title);

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current.classList.add('flash');
    }
  }, [title]);

  const onClick = () => {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
      sidebarToggle.checked = true;
    }
    !isActive &&
      router.push(`/note/${id}${searchParams.size ? `?${searchParams.toString()}` : ''}`);
  };

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current.classList.remove('flash');
      }}
      className={['sidebar-note-list-item', isExpanded ? 'note-expanded' : ''].join(' ')}
    >
      {children}

      <button
        className="sidebar-note-open"
        style={{
          backgroundColor: isPending ? 'var(--gray-80)' : isActive ? 'var(--tertiary-blue)' : '',
          border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
        }}
        onClick={onClick}
      >
        打开笔记进行预览
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={e => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? (
          <img src="/chevron-down.svg" width="10px" height="10px" alt="Collapse" />
        ) : (
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>

      {isExpanded && expandedChildren}
    </div>
  );
}
