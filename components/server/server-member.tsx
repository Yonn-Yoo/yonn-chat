'use client';

import { cn } from '@/lib/utils';
import { Member, MemberRole, Profile, Server } from '@prisma/client';
import { ShieldAlert, ShieldCheck, User } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import UserAvatar from '../user-avatar';

type Props = {
  member: Member & { profile: Profile };
  server: Server;
};

const roleIconMap = {
  [MemberRole.GUEST]: <User className="mr-2 !w-4 !h-4 text-zinc-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 !w-4 !h-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 !w-4 !h-4 text-rose-500" />,
};

export default function ServerMember({ member, server }: Props) {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const handleOnClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <button
      onClick={handleOnClick}
      className={cn(
        'group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
        params?.memberId === member.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      <UserAvatar className="w-6 h-6" src={member.profile.imageUrl} />
      <span
        className={cn(
          'font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
          params?.memberId === member.id &&
            'tesxt-primary dark:text-zinc-200 dark:group-hover:text-white'
        )}
      >
        {member.profile.name}
      </span>
      {icon}
    </button>
  );
}
