'use client';

import { usePathname } from 'next/navigation';

import SideMenu from '@/components/side-menu/SideMenu';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery('mobile');
  const pathname = usePathname();
  const isMyPageRoot = pathname === '/mypage';

  return (
    <div
      className={cn(
        'flex justify-center',
        // 모바일/데스크탑에 따라 다른 외부 여백과 정렬 적용
        {
          'mt-35 items-center': isMobile && isMyPageRoot,
          'mx-24 mt-30': isMobile && !isMyPageRoot,
          'mt-40': !isMobile,
        },
      )}
    >
      <div
        className={cn(
          'flex w-full items-start',
          // 데스크탑에서는 최대 너비와 좌우 간격 적용
          !isMobile && 'max-w-980 justify-between min-md:mx-30 min-md:gap-30',
          // 모바일에서는 중앙 정렬
          isMobile && 'justify-center',
        )}
      >
        {/* SideMenu: 데스크탑에서는 항상, 모바일에서는 /mypage 에서만 보임 */}
        <div className={cn({ hidden: isMobile && !isMyPageRoot })}>
          <SideMenu />
        </div>

        {/* children: 데스크탑에서는 항상, 모바일에서는 /mypage가 아닐 때만 보임 */}
        <main
          className={cn('flex flex-col items-start justify-center', {
            'w-640': !isMobile, // 데스크탑 너비
            'w-full': isMobile && !isMyPageRoot, // 모바일 너비
            hidden: isMobile && isMyPageRoot, // /mypage 에서는 숨김
          })}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
