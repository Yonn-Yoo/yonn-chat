'use client';

import { useModal } from '@/hooks/use-modal-store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export default function LeaveServerModal() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { onOpen, isOpen, onClose, type, data } = useModal();
  const { server } = data;
  const isModalOpen = isOpen && type === 'leaveServer';

  const leaveServer = async () => {
    setLoading(true);
    await axios
      .patch(`api/severs/${server?.id}/leave`)
      .then(handleSuccess)
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  const handleSuccess = () => {
    onClose();
    router.refresh();
    router.push('/');
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#F8F9FA] text-black overflow-hidden p-0">
        <DialogHeader className="pt-6 px-5">
          <DialogTitle className="text-2xl text-center font-semibold">
            Leaver Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leave{' '}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">Leave server modal</div>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-end space-x-3">
            <Button
              className="bg-gray-200 text-zinc-800 hover:bg-gray-300"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={leaveServer} variant="primary" disabled={loading}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
