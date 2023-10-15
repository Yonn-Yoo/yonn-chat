import { cn } from '@/lib/utils';
import { Avatar, AvatarImage } from './ui/avatar';

type Props = {
  src?: string;
  className?: string;
};

export default function UserAvatar({ src, className }: Props) {
  return (
    <Avatar className={cn('h-7 w-7 md:w-10 md:h-10', className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
}
