import { SessionProvider } from 'next-auth/react';
import NextAuthClientComponent from '@/components/NextAuthClientComponent';

export default function ClientPage() {
  return (
    <SessionProvider>
      <NextAuthClientComponent />
    </SessionProvider>
  );
}
