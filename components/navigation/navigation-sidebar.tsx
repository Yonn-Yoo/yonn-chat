import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ModeToggle } from '../mode-toggle';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import NavItem from './nav-item';
import NavigationAction from './navigation-action';

export default async function NavigationSidebar() {
  const profile = await currentProfile();

  if (!profile) {
    redirect('/');
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-zinc-200 dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="w-1/2 h-0.5 bg-zinc-300 dark:bg-zinc-600 rounded-lg" />
      <ScrollArea className="flex-1 w-full">
        {servers.map(({ id, name, imageUrl }) => (
          <NavItem key={id} id={id} name={name} imageUrl={imageUrl} />
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex flex-col items-center space-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-12 w-12',
            },
          }}
        />
      </div>
    </div>
  );
}
