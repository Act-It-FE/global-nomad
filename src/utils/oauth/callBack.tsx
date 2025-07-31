'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import oAuthApi from '@/api/authApi';
import type {
  OAuthAppProvider,
  OAuthResponse,
  OAuthSignUpRequest,
} from '@/api/types/auth';
import { useUserStore } from '@/stores/userStore';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const code = useSearchParams().get('code');
  const [error, setError] = useState<string | null>(null);
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (!code) {
      setError('인가 코드가 없습니다.');
      return;
    }

    const body: OAuthSignUpRequest = {
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/kakao`,
      token: code,
      nickname: '',
    };

    async function handleAuth() {
      // 1) 로그인 시도
      try {
        const data: OAuthResponse = await oAuthApi.postLogin(
          body,
          'kakao' as OAuthAppProvider,
        );
        setUser(data.user);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        router.replace('/'); // 로그인 성공 후 이동
        return;
      } catch (loginErr: unknown) {
        // 2) 등록된 사용자가 아니면
        if (
          loginErr instanceof Error &&
          loginErr.message === 'User not registered'
        ) {
          try {
            router.replace('/signUp'); // 회원가입 페이지로 이동
          } catch (signupErr: unknown) {
            setError(
              signupErr instanceof Error
                ? signupErr.message
                : '회원가입 중 오류가 발생했습니다.',
            );
          }
        } else {
          setError(
            loginErr instanceof Error
              ? loginErr.message
              : '로그인 중 오류가 발생했습니다.',
          );
        }
      }
    }

    void handleAuth();
  }, [code, router, setUser]);

  if (error) {
    return <p className='text-red-500'>오류: {error}</p>;
  }

  return null;
}
