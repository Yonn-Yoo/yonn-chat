import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    inviteCode: string;
  };
};

export default async function InviteCodePage({ params }: Props) {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }
  if (!params.inviteCode) {
    return redirect('/');
  }

  // to check member already exists in the server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <div>
      <span className="text-2xl">asdf</span>
    </div>
  );
}
