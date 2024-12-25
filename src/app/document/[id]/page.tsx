/* eslint-disable @next/next/no-img-element */

import { getDocumentById } from '@/app/actions';
import { DocumentDetail } from '@/components/document-detail';

interface DocumentPageDetailProps {
  params: {
    id: string;
  };
}

export default async function DocumentPageDetail({ params }: DocumentPageDetailProps) {
  const document = await getDocumentById(params.id);

  if (!document) {
    return (
      <div className="h-screen flex items-center justify-center p-4 text-2xl text-center">
        Document not found
      </div>
    );
  }

  return <DocumentDetail className="h-screen" document={document} />;
}
