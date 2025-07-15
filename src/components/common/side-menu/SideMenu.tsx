'use client';

import { usePathname } from 'next/navigation';

import Menu from './Menu';

export default function SideMenu() {
  const pathname = usePathname();

  return (
    <aside className='flex w-291 flex-col items-center justify-center gap-24 rounded-xl border border-gray-50 bg-white px-14 py-24 shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]'>
      <div />

      <Menu activePath={pathname} />
    </aside>
  );
}
