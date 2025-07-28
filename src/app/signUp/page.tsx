'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import kakaoApi from '@/api/kakao';
import { useUserStore } from '@/stores/userStore';
import { getRedirectUrl } from '@/utils/oauth/getRedirectUrl';

export default function SignUp() {
  const router = useRouter();
  const clearProfile = useUserStore((s) => s.clearUser);
  const redirectUrl = getRedirectUrl();
  const user = useUserStore((s) => s.user);
  const handleLogout = async () => {
    try {
      await kakaoApi.logout();

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      clearProfile();

      router.replace('/');
    } catch (err) {
      console.error('로그아웃 실패', err);
    }
  };

  return (
    <>
      <Link href={redirectUrl}>
        <button>카카오로 로그인</button>
      </Link>
      <Link href={redirectUrl}>
        <button>카카오로 회원가입</button>
      </Link>
      <main className='p-8'>
        {user ? (
          <h1>안녕하세요, {user?.nickname}님!</h1>
        ) : (
          <h1>로그인해주세요</h1>
        )}
      </main>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
}
