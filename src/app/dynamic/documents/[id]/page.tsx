/* eslint-disable @next/next/no-img-element */

import { getDocumentById } from '../actions';

interface DocumentPageDetailProps {
  params: {
    id: string;
  };
}

export default async function DocumentPageDetail({ params }: DocumentPageDetailProps) {
  const document = await getDocumentById(params.id);

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="relative">
        <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
          <img
            alt=""
            src={document.source}
            className="pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75"
          />
          <button type="button" className="absolute inset-0 focus:outline-none">
            <span className="sr-only">View details for {document.title}</span>
          </button>
        </div>
        <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
          {document.title}
        </p>
        <p className="pointer-events-none block text-sm font-medium text-gray-500">
          {document.size}
        </p>
      </div>
    </div>
  );
}
