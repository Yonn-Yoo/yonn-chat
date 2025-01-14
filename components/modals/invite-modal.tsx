'use client';

import { useModal } from '@/hooks/use-modal-store';
import { useOrigin } from '@/hooks/use-origin';
import axios from 'axios';
import { Copy, CopyCheck, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function InviteModal() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();
  const { server } = data;
  const isModalOpen = isOpen && type === 'invite';
  const inviteURL = `${origin}/invite/${server?.inviteCode}`;

  const handleOnCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(inviteURL);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const generateNewLink = async () => {
    setLoading(true);
    axios
      .patch(`/api/servers/${server?.id}/invite-code`)
      .then(({ data }) => onOpen('invite', { server: data }))
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#F8F9FA] text-black overflow-hidden p-0">
        <DialogHeader className="pt-6 px-5">
          <DialogTitle className="text-2xl text-center font-semibold">
            멤버 초대
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs md:text-sm font-bold text-zinc-500 dark:text-secondary/80">
            멤버 초대 링크
          </Label>
          <div className="flex items-center mt-3 space-x-2">
            <Input
              disabled={loading}
              className="bg-zinc-300/40 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteURL}
            />

            <Button
              disabled={loading}
              className="group"
              onClick={handleOnCopy}
              size="icon"
            >
              {copied ? (
                <CopyCheck className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 group-hover:text-zinc-400" />
              )}
            </Button>
          </div>
          <Button
            disabled={loading}
            onClick={generateNewLink}
            variant="link"
            className="flex items-center text-zinc-600 font-medium mt-2 p-0 group"
          >
            {loading ? '새 링크 생성중...' : '새 링크 생성하기'}
            <RefreshCcw
              className={`w-3.5 h-3.5 ml-2 group-hover:rotate-90 duration-200 ease-out ${
                loading && 'animate-spin'
              }`}
            />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
