import { Hash } from 'lucide-react';
import MobileToggle from '../mobile-toggle';

type Props = {
  serverId: string;
  name: string;
  type: 'channel' | 'conversation';
  imageUrl?: string;
};

export default function ChatHeader({ serverId, name, type, imageUrl }: Props) {
  return (
    <div className="font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      <span className="font-semibold text-black dark:text-white">{name}</span>
    </div>
  );
}
