import SideMenu from '@/components/common/side-menu/SideMenu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-tb:max-w-744 flex w-full max-w-980 items-start justify-between'>
      <SideMenu />
      <main className='flex w-640 flex-col items-start justify-center'>
        {children}
      </main>
    </div>
  );
}
