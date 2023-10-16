'use client';

import { ServerWithMembersWithProfiles } from '@/types';
import { ChannelType, MemberRole } from '@prisma/client';
import { Plus } from 'lucide-react';
import ActionTooltip from '../navigation/action-tooltip';

type Props = {
  label: string;
  role?: MemberRole;
  sectionType: 'channels' | 'members';
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
};

export default function ServerSection({
  label,
  role,
  sectionType,
  channelType,
  server,
}: Props) {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <ActionTooltip label="Create Channel" side="top">
          <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
            <Plus className="w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
}