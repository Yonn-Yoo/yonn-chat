'use client';

import { useModal } from '@/hooks/use-modal-store';
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

  const openInviteModal = () => {
    onOpen('invite', { server });
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
              onClick={openInviteModal}
              className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
            >
              Invite Members
              <UserPlus className="w-5 h-5 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
              Create Channel
              <PlusCircle className="w-5 h-5 ml-auto" />
            </DropdownMenuItem>
          </>
        )}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
            Server Settings
            <Settings className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
            Manage Members
            <Users className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
            Delete Server
            <Trash className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
            Leave Server
            <LogOut className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
