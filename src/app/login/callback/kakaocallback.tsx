/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
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
  const isProduction = process.env.NODE_ENV === 'production';
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
  const VERCEL_HOST = process.env.NEXT_PUBLIC_VERCEL_URL;
  const baseUrl =
    isProduction && VERCEL_HOST
      ? VERCEL_HOST.replace(/\/$/, '')
      : APP_URL
        ? APP_URL.replace(/\/$/, '')
        : '';

  const redirectUri = `${baseUrl}/login/callback`;
  const hasHandledRef = useRef(false);

  // 1) 성공 시 상태 저장 + 리다이렉트
  function handleSuccessfulAuth(data: OAuthResponse) {
    setUser(data.user);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    router.replace('/');
  }

  // 2) 실제 카카오 로그인/회원가입 API 호출
  async function handleAuth() {
    const body: OAuthRequest = {
      redirectUri,
      token: code!,
    };

    try {
      if (flow === 'login') {
        const data = await oAuthApi.postLogin(
          body,
          'kakao' as OAuthAppProvider,
        );
        return handleSuccessfulAuth(data);
      }
    } catch (err) {
      const apiErr = err as ApiError;
      if (apiErr.response?.status === 404) {
        return router.replace('/signUp');
      }
    }

    if (flow === 'signUp') {
      try {
        const data = await oAuthApi.postSignUp(
          body,
          'kakao' as OAuthAppProvider,
        );
        return handleSuccessfulAuth(data);
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

  // 3) useEffect: code가 들어오면 한 번만 handleAuth 호출
  useEffect(() => {
    if (!code || hasHandledRef.current) return;

    hasHandledRef.current = true;
    void handleAuth();
  }, [code, flow, handleAuth, setUser]);

  return null;
}
