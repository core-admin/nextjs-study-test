export default function Page({ params }: { params: { id: string } }) {
  return (
    <h1 className="text-2xl text-center">
      src/app/redirect/to-redirect-id/[id] params.id {params.id}
    </h1>
  );
}
