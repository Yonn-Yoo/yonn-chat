'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleOnClick = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };

  return (
    // TODO: if dropdown menu is not used in other component, remove package

    <Button
      onClick={handleOnClick}
      className="rounded-xl w-12 h-12 bg-indigo-500 dark:bg-indigo-400 hover:!bg-opacity-70 group"
      variant="outline"
      size="icon"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 fill-white stroke-white group-hover:stroke-black" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
