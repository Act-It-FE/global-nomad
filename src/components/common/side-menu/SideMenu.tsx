'use client';

import { usePathname } from 'next/navigation';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

import Menu from './Menu';
import Profile from './Profile';

export default function SideMenu() {
  const isTablet = useMediaQuery('tablet');
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'flex flex-col items-center justify-center gap-24 rounded-xl border border-gray-50 bg-white px-14 py-24 shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]',
        `${isTablet ? 'w-178 gap-12 px-14 py-16' : 'w-291 gap-24 px-14 py-24'}`,
      )}
    >
      <Profile />
      <Menu activePath={pathname} />
    </aside>
  );
}
