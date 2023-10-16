'use client';

import { Video, VideoOff } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import ActionTooltip from '../navigation/action-tooltip';

export default function ChatVideoButton() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVideo = searchParams?.get('video');
  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? 'End video call' : 'Start video call';

  const handleOnClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || '',
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <button
        className="hover:opacity-75 transition mr-4"
        onClick={handleOnClick}
      >
        <Icon className="h-7 w-7 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  );
}
