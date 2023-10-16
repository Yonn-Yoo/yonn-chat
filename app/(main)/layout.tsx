import NavigationSidebar from '@/components/navigation/navigation-sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="h-full">
      <div className="hidden md:flex h-full w-20 z-20 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-20 h-full">{children}</main>
    </aside>
  );
}
