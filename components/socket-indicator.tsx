'use client';

import { cn } from '@/lib/utils';
import { useSocket } from './providers/socket-provider';
import { Badge } from './ui/badge';

export default function SocketIndicator() {
  const { connected } = useSocket();

  return (
    <Badge
      variant="outline"
      className={cn(
        'text-white border-none',
        connected ? 'bg-green-600' : 'bg-yellow-600'
      )}
    >
      {connected ? 'Live: Real-time updates' : 'Fallback:Polling every 1s'}
    </Badge>
  );
}
