'use client';

import { usePathname } from 'next/navigation';

import SideMenu from '@/components/common/side-menu/SideMenu';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function ResponsiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery('(max-width: 743px)');
  const pathname = usePathname();

  // 모바일 + /mypage 루트일 때만 SideMenu만 보여줌
  if (isMobile && pathname === '/mypage') {
    return (
      <div className='flex items-center justify-center'>
        <SideMenu />
      </div>
    );
  } else if (isMobile) {
    return (
      <div className='mx-24 flex items-center justify-center'>{children}</div>
    );
  }

  // 그 외에는 children도 같이 보여줌
  return (
    <div className='mt-40 flex w-full max-w-980 items-start justify-between min-md:mx-30 min-md:gap-30'>
      <SideMenu />
      <main className='flex w-640 flex-col items-start justify-center'>
        {children}
      </main>
    </div>
  );
}
