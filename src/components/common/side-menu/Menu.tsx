import Link from 'next/link';

import ICON_MAP from '@/constants/iconMap';

import Icon from '../Icon';

const menuItems: {
  href: string;
  icon: keyof typeof ICON_MAP;
  label: string;
}[] = [
  { href: '/mypage/info', icon: 'User', label: '내 정보' },
  { href: '/mypage/reserves', icon: 'List', label: '예약 내역' },
  { href: '/mypage/activities', icon: 'Setting', label: '내 체험 관리' },
  { href: '/mypage/reserve-status', icon: 'Calender', label: '예약 현황' },
];

export default function Menu({ activePath }: { activePath: string }) {
  return (
    <>
      {menuItems.map((item) => {
        const isActive = activePath === item.href;
        return (
          <Link key={item.label} className='block w-full' href={item.href}>
            <div
              className={`flex h-54 w-full items-center gap-8 self-stretch rounded-2xl py-12 pr-40 pl-20 text-gray-600 ${
                isActive ? 'bg-primary-100 text-gray-950' : ''
              }`}
            >
              <Icon
                className={`size-24 ${isActive ? 'text-primary-500' : ''}`}
                icon={item.icon}
              />
              <span className='text-center leading-normal tracking-tight'>
                {item.label}
              </span>
            </div>
          </Link>
        );
      })}
    </>
  );
}
