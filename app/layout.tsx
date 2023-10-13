import ThemeProvider from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const inter = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YonnChat',
  description: 'Chat application for team',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, 'bg-[#F8F9FA] dark:bg-[#313338]')}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="yonnchat-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
