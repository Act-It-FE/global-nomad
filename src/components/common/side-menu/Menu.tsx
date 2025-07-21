import Link from 'next/link';

import ICON_MAP from '@/constants/iconMap';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

import Icon from '../Icon';

const MENU_ITEMS: {
  href: string;
  icon: keyof typeof ICON_MAP;
  label: string;
}[] = [
  { href: '/mypage/info', icon: 'User', label: '내 정보' },
  { href: '/mypage/reserves', icon: 'List', label: '예약내역' },
  { href: '/mypage/activities', icon: 'Setting', label: '내 체험 관리' },
  { href: '/mypage/reserve-status', icon: 'Calender', label: '예약 현황' },
];

export default function Menu({ activePath }: { activePath: string }) {
  const isTablet = useMediaQuery('tablet');

  return (
    <>
      {MENU_ITEMS.map((item) => {
        const isActive = activePath === item.href;
        return (
          <Link
            key={item.label}
            className={`block w-full ${isTablet ? 'w-150' : ''}`}
            href={item.href}
          >
            <div
              className={cn(
                'flex items-center gap-8 rounded-2xl pl-20 text-gray-600',
                `${isActive ? 'bg-primary-100 text-gray-950' : ''} ${isTablet ? 'h-auto py-14' : 'h-54 py-12'}`,
              )}
            >
              <Icon
                className={` ${isActive ? 'text-primary-500' : ''} ${isTablet ? 'size-20' : 'size-24'}`}
                icon={item.icon}
              />
              <span className='text-16_M leading-normal tracking-tight'>
                {item.label}
              </span>
            </div>
          </Link>
        );
      })}
    </>
  );
}
