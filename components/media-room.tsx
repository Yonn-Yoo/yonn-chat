'use client';

import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import { useEffect, useState } from 'react';
// import { Channel } from '@prisma/client';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
// import { loadComponents } from 'next/dist/server/load-components';
// import { LivekitError } from 'livekit-client';

type Props = {
  chatId: string;
  video: boolean;
  audio: boolean;
};

export default function MediaRoom({ chatId, video, audio }: Props) {
  const { user } = useUser();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) {
      return;
    }

    const name = `${user.firstName} ${user.lastName}`;

    (async () => {
      try {
        const res = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
        const data = await res.json();
        setToken(data.token);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [user?.firstName, user?.lastName, chatId]);

  return (
    <>
      {token ? (
        <LiveKitRoom
          data-lk-theme="default"
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          token={token}
          connect={true}
          video={video}
          audio={audio}
        >
          <VideoConference />
        </LiveKitRoom>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}

function LoadingComponent() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Loader2 className="w-7 h-7 text-zinc-50 animate-spin my-5" />
      <span className="text-zinc-500 dark:text-zinc-400">Loading...</span>
    </div>
  );
}
