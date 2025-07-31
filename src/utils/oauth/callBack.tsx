'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import oAuthApi from '@/api/oAuth';
import type {
  ApiError,
  OAuthAppProvider,
  OAuthRequest,
} from '@/api/types/auth';
import { useUserStore } from '@/stores/userStore';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const code = useSearchParams().get('code');
  const flow = useSearchParams().get('state');
  const [error, setError] = useState<string | null>(null);
  const setUser = useUserStore((s) => s.setUser);

  const hasHandledRef = useRef(false);

  useEffect(() => {
    if (!code || hasHandledRef.current) return;
    hasHandledRef.current = true;

    if (!code) {
      setError('인가 코드가 없습니다.');
      return;
    }

    const body: OAuthRequest = {
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/kakao`,
      token: code,
      nickname: '',
    };

    async function handleAuth() {
      try {
        if (flow === 'login') {
          const data = await oAuthApi.postLogin(
            body,
            'kakao' as OAuthAppProvider,
          );
          setUser(data.user);
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          router.replace('/');
        }
      } catch (err) {
        const apiErr = err as ApiError;
        if (apiErr.response?.status === 404) {
          return router.replace('/signUp');
        }
        setError(apiErr.message || '로그인 중 오류가 발생했습니다.');
        return;
      }
      if (flow === 'signup') {
        try {
          const data = await oAuthApi.postSignUp(
            body,
            'kakao' as OAuthAppProvider,
          );
          setUser(data.user);
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          return router.replace('/');
        } catch (err) {
          const apiErr = err as ApiError;
          if (
            apiErr.response?.status === 400 &&
            apiErr.response?.data?.message === '이미 등록된 사용자입니다.'
          ) {
            return router.replace('/login');
          }
          throw err;
        }
      }
    }
    void handleAuth();
  }, [code, router, setUser, flow]);

  if (error) {
    return <p className='text-red-500'>오류: {error}</p>;
  }

  return null;
}
