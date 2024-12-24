interface DocumentPageDetailProps {
  params: {
    ids: string[];
  };
}

export default function DocumentsPageDetail({ params }: DocumentPageDetailProps) {
  return (
    <h1 className="text-center text-2xl h-screen flex items-center justify-center">
      ids: {JSON.stringify(params.ids)}
    </h1>
  );
}
