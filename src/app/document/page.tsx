/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { getDocuments } from '@/app/actions';

export default async function DocumentPage() {
  const documents = await getDocuments();
  return (
    <ul
      role="list"
      className="p-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {documents.map(document => (
        <li key={document.id} className="relative">
          <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <img
              alt=""
              src={document.source}
              className="pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75"
            />
            <Link
              className="absolute inset-0 focus:outline-none"
              href={`./documents/${document.id}`}
            >
              <span className="sr-only">View details for {document.title}</span>
            </Link>
          </div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {document.title}
          </p>
          <p className="pointer-events-none block text-sm font-medium text-gray-500">
            {document.size}
          </p>
        </li>
      ))}
    </ul>
  );
}
