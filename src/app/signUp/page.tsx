'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import kakaoApi from '@/api/kakao';
import { useUserStore } from '@/stores/userStore';
import { getRedirectUrl } from '@/utils/oauth/getRedirectUrl';

// import KakaoCallbackPage from '@/utils/oauth/callBack';

export default function SignUp() {
  const router = useRouter();
  const clearProfile = useUserStore((s) => s.clearUser);
  const redirectUrl = getRedirectUrl();
  const user = useUserStore((s) => s.user);
  // const KakaoCallbackPage =
  const handleLogout = async () => {
    try {
      // 1) 카카오 서버에 로그아웃 요청
      await kakaoApi.logout();

      // 2) 로컬 스토리지·전역 상태 정리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      clearProfile();

      // 3) 로그인 페이지(또는 원하는 곳)로 이동
      router.replace('/');
    } catch (err) {
      console.error('로그아웃 실패', err);
      // 필요시 사용자에게 안내 메시지 띄우기
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
        {/* 나머지 UI */}
      </main>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
}
