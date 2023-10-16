'use client';

import { useChatQuery } from '@/hooks/use-chat-query';
import { Member, Message, Profile } from '@prisma/client';
import { format } from 'date-fns';
import { Loader2, ServerCrash } from 'lucide-react';
import { Fragment } from 'react';
import ChatItem from './chat-item';
import ChatWelcome from './chat-welcome';

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

type Props = {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: 'channelId' | 'conversationId';
  paramValue: string;
  type: 'channel' | 'conversation';
};

const DATE_FORMAT = 'd MMM yyyy, HH:mm';

export default function ChatMessages({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: Props) {
  const queryKey = `chat:${chatId}`;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  if (status === 'loading') {
    return (
      <div className="flex flex-col flex-1 h-full justify-center items-center text-zinc-500">
        <Loader2 className="w-7 h-7 animate-spin my-4" />
        <span>Loading...</span>
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="flex flex-col flex-1 h-full justify-center items-center text-zinc-500">
        <ServerCrash className="w-7 h-7 my-4" />
        <span>Something went wrong 🥲</span>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full flex flex-col py-4 overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome name={name} type="channel" />

      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, idx) => (
          <Fragment key={`chat-${idx}`}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                currentMember={member}
                member={message.member}
                id={message.id}
                content={message.content}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
