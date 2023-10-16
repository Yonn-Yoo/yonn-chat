'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import ActionTooltip from './action-tooltip';

type NavItemProps = {
  id: string;
  imageUrl: string;
  name: string;
};

export default function NavItem({ id, imageUrl, name }: NavItemProps) {
  const params = useParams();
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        className="group relative flex items-center mb-4"
        onClick={handleOnClick}
      >
        <div
          className={cn(
            'absolute left-0 bg-primary rounded-r-full transition-all w-1',
            params?.serverId !== id && 'group-hover:h-5',
            params?.serverId === id ? 'h-6' : 'h-2'
          )}
        />
        <div
          className={cn(
            'relative mx-4 group h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden',
            params?.serverId === id && 'bg-primary/10 text-primary rounded-2xl'
          )}
        >
          <Image fill src={imageUrl} alt="channel" />
        </div>
      </button>
    </ActionTooltip>
  );
}
