import Link from 'next/link';

import ICON_MAP from '@/constants/iconMap';
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
  return (
    <>
      {MENU_ITEMS.map((item) => {
        const isActive = activePath === item.href;
        return (
          <Link
            key={item.label}
            className='block w-262 md:max-lg:w-150'
            href={item.href}
          >
            <div
              className={cn(
                'flex items-center gap-8 rounded-2xl pl-20 text-gray-600',
                `h-54 py-12 md:max-lg:h-auto md:max-lg:py-14 ${isActive ? 'bg-primary-100 text-gray-950' : ''}`,
              )}
            >
              <Icon
                className={`size-24 md:max-lg:size-20 ${isActive ? 'text-primary-500' : ''} `}
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
