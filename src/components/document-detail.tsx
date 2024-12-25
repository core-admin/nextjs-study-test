/* eslint-disable @next/next/no-img-element */

import type { DocumentData } from '@/app/actions';
import { cn } from '@/lib/utils';

export function DocumentDetail({
  document,
  className,
}: {
  document: DocumentData;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-center p-4', className)}>
      <div className="relative">
        <div className="group overflow-hidden rounded-lg bg-gray-100">
          <img alt="" src={document.source} className="aspect-[10/7] object-cover" />
        </div>
        <p className="mt-2 block truncate text-sm font-medium text-gray-900">{document.title}</p>
        <p className="block text-sm font-medium text-gray-500">{document.size}</p>
      </div>
    </div>
  );
}
