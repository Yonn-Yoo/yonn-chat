'use client';

import { useModal } from '@/hooks/use-modal-store';
import { ServerWithMembersWithProfiles } from '@/types';
import { MemberRole } from '@prisma/client';
import axios from 'axios';
import {
  AlertCircle,
  Check,
  Loader,
  MoreVertical,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ScrollArea } from '../ui/scroll-area';
import UserAvatar from '../user-avatar';

const roleIconMap = {
  GUEST: <User className="w-4 h-4 text-zinc-500" />,
  MODERATOR: <ShieldCheck className="w-4 h-4 text-indigo-500" />,
  ADMIN: <ShieldAlert className="w-4 h-4 text-rose-400" />,
};

export default function MembersModal() {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState('');
  const router = useRouter();

  const { server } = data as { server: ServerWithMembersWithProfiles };
  const isModalOpen = isOpen && type === 'members';

  const displayMemberLength = () => {
    const memberLength = server?.members?.length;
    return memberLength > 1 ? `${memberLength} members` : '1 memeber';
  };

  const handleOnKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const res = await axios.delete(url);
      router.refresh();
      onOpen('members', { server: res.data });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId('');
    }
  };

  const handleOnRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const res = await axios.patch(url, { role });
      router.refresh();
      onOpen('members', { server: res.data });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId('');
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#F8F9FA] text-black overflow-hidden">
        <DialogHeader className="pt-6 px-5">
          <DialogTitle className="text-2xl text-center font-semibold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {displayMemberLength()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map(({ id, role, profile, profileId }) => (
            <div key={id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center gap-x-1">
                  {roleIconMap[role]}
                  {profile.name}
                </div>
                <span className="text-xs text-zinc-500">{profile.email}</span>
              </div>
              {server.profileId !== profileId && loadingId !== id && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="w-4 h-4 text-zinc-600" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center">
                          <ShieldQuestion className="w-4 h-4 mr-2" />
                          <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="w-36">
                            <DropdownMenuItem
                              onClick={() => handleOnRoleChange(id, 'GUEST')}
                            >
                              <User className="w-4 h-4 mr-2" />
                              Guest
                              {role === 'GUEST' && (
                                <Check className="w-4 h-4 ml-auto text-indigo-500" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleOnRoleChange(id, 'MODERATOR')
                              }
                            >
                              <ShieldCheck className="w-4 h-4 mr-2" />
                              Moderator
                              {role === 'MODERATOR' && (
                                <Check className="w-4 h-4 ml-auto text-indigo-500" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleOnKick(id)}
                        className="text-rose-400"
                      >
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              {loadingId === id && (
                <Loader className="w-4 h-4 animate-spin text-zinc-500 ml-auto" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
