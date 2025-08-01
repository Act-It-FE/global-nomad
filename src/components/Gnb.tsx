'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AlarmActive from '@/assets/icons/alarm_active.svg';
import useMyNotifyQuery from '@/hooks/myNotifications/useMyNotifyQuery';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

import DropDown from './DropDown';
import NotificationPanel from './NotificationPanel';

interface TemporaryProps {
  user?: {
    id: number;
    email?: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt?: string;
    updatedAt?: string;
  };
}

const imgDefaultProfile = '/images/profile-default.svg';
const imgLogoText = '/images/logo-sm-text.png';
const imgLogo = '/images/logo-sm.png';

export default function Gnb({ user }: TemporaryProps) {
  const router = useRouter();
  const isMobile = useMediaQuery('mobile');
  const [isOpen, setIsOpen] = useState(false);
  const { data: notifications } = useMyNotifyQuery();

  return (
    <nav
      className={cn(
        'sticky top-0 right-0 left-0 z-50',
        'flex items-center justify-between',
        'mx-auto h-48 max-w-1580 px-24 md:h-80 md:px-30',
        'bg-white',
      )}
    >
      <Link href='/'>
        <Image
          alt='logo'
          className='max-md:hidden'
          height={28}
          src={imgLogoText}
          width={174}
        />
        <Image
          alt='logo'
          className='md:hidden'
          height={28}
          src={imgLogo}
          width={28}
        />
      </Link>
      <div
        className={cn(
          'txt-14_M flex items-center text-gray-950',
          user ? 'gap-20' : 'gap-10 md:gap-12',
        )}
      >
        {user ? (
          <>
            <div className='relative'>
              <button type='button' onClick={() => setIsOpen((prev) => !prev)}>
                <AlarmActive
                  className={cn(
                    'size-24',
                    isOpen ? 'text-primary-500' : 'text-gray-600',
                  )}
                />
              </button>
              <NotificationPanel
                list={
                  notifications?.pages.flatMap((page) => page.notifications) ||
                  []
                }
                open={isOpen}
                onClose={() => setIsOpen(false)}
              />
            </div>
            <div className='h-14 w-1 bg-gray-100' />
            <div className='flex items-center gap-10'>
              <Image
                alt='profile image'
                className='size-30 rounded-full object-cover'
                height={30}
                src={user.profileImageUrl ?? imgDefaultProfile}
                width={30}
              />
              <DropDown
                items={[
                  {
                    text: '마이페이지',
                    onClick: () =>
                      router.push(isMobile ? '/mypage' : '/mypage/info'),
                  },
                  {
                    text: '로그아웃',
                    danger: true,
                    onClick: () => {},
                  },
                ]}
                position='bottom'
                trigger={user.nickname}
              />
            </div>
          </>
        ) : (
          <>
            <div className='w-60 text-center md:w-70'>
              <Link href='/login'>로그인</Link>
            </div>
            <div className='w-60 text-center md:w-70'>
              <Link href='/signup'>회원가입</Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
