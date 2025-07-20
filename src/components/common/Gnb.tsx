import Image from 'next/image';
import Link from 'next/link';

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
    <nav className='mx-auto flex h-48 max-w-1580 items-center justify-between px-24 md:h-80 md:px-30'>
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
        className={`txt-14_M flex items-center text-gray-950 ${user ? 'gap-20' : 'gap-10 md:gap-12'}`}
      >
        {user ? (
          <></>
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
