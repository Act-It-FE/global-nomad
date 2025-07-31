'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

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
  const setUser = useUserStore((s) => s.setUser);

  const hasHandledRef = useRef(false);

  useEffect(() => {
    if (!code || hasHandledRef.current) return;
    hasHandledRef.current = true;

    const nicknameValue: string = '';

    const body: OAuthRequest = {
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/callback`,
      token: code,
      ...(nicknameValue && { nickname: nicknameValue }),
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

  return null;
}
