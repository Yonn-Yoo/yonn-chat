'use client';

import { useModal } from '@/hooks/use-modal-store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
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

export default function DeleteChannelModal() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const { server, channel } = data;
  const isModalOpen = isOpen && type === 'deleteChannel';

  const deleteServer = async () => {
    setLoading(true);
    const url = qs.stringifyUrl({
      url: `/api/channels/${channel?.id}`,
      query: {
        serverId: server?.id,
      },
    });

    await axios
      .delete(url)
      .then(handleSuccess)
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  const handleSuccess = () => {
    onClose();
    router.refresh();
    router.push(`/servers/${server?.id}`);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#F8F9FA] text-black overflow-hidden p-0">
        <DialogHeader className="pt-6 px-5">
          <DialogTitle className="text-2xl text-center font-semibold">
            채널 삭제
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            정말로 삭제하시겠습니까? <br />
            <span className="font-semibold text-indigo-500">
              {`"${channel?.name}"`}{' '}
            </span>
            채널은 영구적으로 삭제됩니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-end space-x-3">
            <Button
              className="bg-gray-200 text-zinc-800 hover:bg-gray-300"
              onClick={onClose}
              disabled={loading}
            >
              취소
            </Button>
            <Button onClick={deleteServer} variant="primary" disabled={loading}>
              {loading ? '삭제중...' : '삭제'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
