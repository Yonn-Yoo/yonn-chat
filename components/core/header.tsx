import { UserButton } from '@clerk/nextjs';
import { ModeToggle } from '../mode-toggle';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-indigo-400">
      <h1 className="text-lg fontbold text-white">Yonn-Chat</h1>
      <div className="flex items-center space-x-3">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
