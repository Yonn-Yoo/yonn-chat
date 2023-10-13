import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { redirect } from 'next/navigation';

export default async function SetupPage() {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  server && redirect(`/servers/${server.id}`);

  return (
    <div>
      <span>server is on</span>
    </div>
  );
}