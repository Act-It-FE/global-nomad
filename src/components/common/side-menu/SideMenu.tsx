'use client';

import { usePathname } from 'next/navigation';

import { cn } from '@/utils/cn';

import Menu from './Menu';
import Profile from './Profile';

export default function SideMenu() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'w-291 gap-24 px-14 py-24',
        'max-tb:w-178 max-tb:px-14 max-tb:py-16 max-tb:gap-12',
        'flex w-291 flex-col items-center justify-center gap-24 rounded-xl border border-gray-50 bg-white px-14 py-24 shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]',
      )}
    >
      <Profile />
      <Menu activePath={pathname} />
    </aside>
  );
}
