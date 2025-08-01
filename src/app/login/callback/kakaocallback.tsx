'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import oAuthApi from '@/api/oAuth';
import type {
  ApiError,
  OAuthAppProvider,
  OAuthRequest,
  OAuthResponse,
} from '@/api/types/auth';
import { useUserStore } from '@/stores/userStore';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const code = useSearchParams().get('code');
  const flow = useSearchParams().get('state');
  const setUser = useUserStore((s) => s.setUser);

  const hasHandledRef = useRef(false);

  useEffect(() => {
    if (!code || hasHandledRef.current) return;
    hasHandledRef.current = true;

    const nicknameValue: string = '';

    const body: OAuthRequest = {
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/login/callback`,
      token: code,
      ...(nicknameValue && { nickname: nicknameValue }),
    };
    const handleSuccessfulAuth = (data: OAuthResponse) => {
      setUser(data.user);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      router.replace('/');
    };

    async function handleAuth() {
      try {
        if (flow === 'login') {
          const data = await oAuthApi.postLogin(
            body,
            'kakao' as OAuthAppProvider,
          );
          console.log(data);
          handleSuccessfulAuth(data);
        }
      } catch (err) {
        const apiErr = err as ApiError;
        if (apiErr.response?.status === 404) {
          router.replace('/signUp');
          return;
        }
      }
      if (flow === 'signup') {
        try {
          const data = await oAuthApi.postSignUp(
            body,
            'kakao' as OAuthAppProvider,
          );
          handleSuccessfulAuth(data);
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

  return null;
}
