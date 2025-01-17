'use client';

import { ModalType, useModal } from '@/hooks/use-modal-store';
import { ServerWithMembersWithProfiles } from '@/types';
import { MemberRole } from '@prisma/client';
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type Props = {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
};

export default function ServerHeader({ server, role }: Props) {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  const openModal = (type: ModalType) => {
    onOpen(type, { server });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full h-12 flex items-center text-md font-semibold px-3  border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="w-5 h-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs text-black dark:text-neutral-400 space-y-0.5">
        {isModerator && (
          <>
            <DropdownMenuItem
              onClick={() => openModal('invite')}
              className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
            >
              멤버 초대
              <UserPlus className="w-5 h-5 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => openModal('createChannel')}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              채널 생성
              <PlusCircle className="w-5 h-5 ml-auto" />
            </DropdownMenuItem>
          </>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => openModal('editServer')}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            서버 세팅
            <Settings className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => openModal('members')}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            멤버 관리
            <Users className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => openModal('deleteServer')}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            서버 삭제
            <Trash className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => openModal('leaveServer')}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            서버 나가기
            <LogOut className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
