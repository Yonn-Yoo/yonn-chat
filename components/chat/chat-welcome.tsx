type Props = {
  name: string;
  type: 'channel' | 'conversation';
};

export default function ChatWelcome({ name, type }: Props) {
  return (
    <div className="flex flex-col space-y-2 px-4 mb-4">
      <span className="text-xl md:text-3xl font-bold">
        {type === 'channel' ? `Welcome to #${name}` : name}
      </span>
      <span className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === 'channel'
          ? `This is the satrt of the #${name} channel.`
          : `This is the start of your conversation with ${name}`}
      </span>
    </div>
  );
}
