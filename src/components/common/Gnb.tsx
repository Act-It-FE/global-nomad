import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/utils/cn';

import DropDown from './DropDown';
import Icon from './Icon';

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

export default function Gnb({ user }: TemporaryProps) {
  return (
    <nav
      className={cn(
        'sticky top-0 right-0 left-0',
        'flex items-center justify-between',
        'mx-auto h-48 max-w-1580 px-24 md:h-80 md:px-30',
      )}
    >
      <Link href='/'>
        <Image
          alt='logo'
          className='max-md:hidden'
          height={28}
          src='/images/logo-sm-text.png'
          width={174}
        />
        <Image
          alt='logo'
          className='md:hidden'
          height={28}
          src='/images/logo-sm.png'
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
            <button type='button'>
              <Icon className='size-24 text-gray-600' icon='AlarmActive' />
            </button>
            <div className='h-14 w-1 bg-gray-100' />
            <div className='flex items-center gap-10'>
              <Image
                alt='profile image'
                className='size-30 rounded-full object-cover'
                height={30}
                src={user.profileImageUrl ?? '/images/profile-default.svg'}
                width={30}
              />
              <DropDown
                items={[
                  {
                    text: '마이페이지',
                    onClick: () => {},
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
