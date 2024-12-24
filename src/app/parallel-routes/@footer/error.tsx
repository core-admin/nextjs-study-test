'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <h1 className="text-2xl text-center text-red-500">
      <p>{error.message}</p>
      {/* <br /> */}
    </h1>
  );
}
