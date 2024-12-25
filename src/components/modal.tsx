'use client';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={() => router.back()}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
