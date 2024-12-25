import { Item } from '@/components/item';
import { items } from '@/data';
import { AnimatePresence } from 'motion/react';

interface DocumentPageDetailProps {
  params: {
    id: string;
  };
}

export default function DocumentPageDetail({ params }: DocumentPageDetailProps) {
  const document = items.find(item => item.id === params.id);

  if (!document) {
    return (
      <div className="h-screen flex items-center justify-center p-4 text-2xl text-center text-white">
        Document not found
      </div>
    );
  }

  return (
    <AnimatePresence>
      <Item id={document.id} />
    </AnimatePresence>
  );
}
