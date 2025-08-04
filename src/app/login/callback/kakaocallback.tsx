/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import oAuthApi from '@/api/oAuth';
import type {
  ApiError,
  OAuthAppProvider,
  OAuthRequest,
} from '@/api/types/auth';
import Modal from '@/components/Modal/Modal';
import { useUserStore } from '@/stores/userStore';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const code = useSearchParams().get('code');
  const flow = useSearchParams().get('state');
  const setUser = useUserStore((s) => s.setUser);
  const isProduction = process.env.NODE_ENV === 'production';
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
  const VERCEL_HOST = process.env.NEXT_PUBLIC_VERCEL_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const baseUrl =
    isProduction && VERCEL_HOST
      ? VERCEL_HOST.replace(/\/$/, '')
      : APP_URL
        ? APP_URL.replace(/\/$/, '')
        : '';

  const redirectUri = `${baseUrl}/login/callback`;
  const hasHandledRef = useRef(false);

  async function handleAuth() {
    const body: OAuthRequest = {
      redirectUri,
      token: code!,
      nickname: '',
    };

    try {
      if (flow === 'login') {
        const data = await oAuthApi.postLogin(
          body,
          'kakao' as OAuthAppProvider,
        );
        setUser(data.user);
        console.log(data.user);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        router.replace('/');
      }
    } catch (err) {
      const apiErr = err as ApiError;
      if (apiErr.response?.status === 404) {
        return router.replace('/signUp');
      }
    }

    if (flow === 'signUp') {
      try {
        const signupData = await oAuthApi.postSignUp(
          {
            redirectUri,
            token: code!,
            nickname: '사용자',
          },
          'kakao' as OAuthAppProvider,
        );
        setUser(signupData.user);
        localStorage.setItem('accessToken', signupData.accessToken);
        localStorage.setItem('refreshToken', signupData.refreshToken);
        router.replace('/login');
      } catch (err) {
        const apiErr = err as ApiError;
        console.log(apiErr.response?.data?.message);
        if (
          apiErr.response?.status === 400 &&
          apiErr.response?.data?.message === '이미 등록된 사용자입니다.'
        ) {
          setIsModalOpen(true);
          return;
        }
      }
    }
  }

  useEffect(() => {
    if (!code || hasHandledRef.current) return;

    hasHandledRef.current = true;
    void handleAuth();
  }, [code, flow, handleAuth, setUser]);

  return (
    <>
      {isModalOpen && (
        <Modal
          message='이미 등록된 아이디 입니다.'
          variant='onlyText'
          onClose={() => {
            setIsModalOpen(false);
            router.replace('/login');
          }}
        />
      )}
    </>
  );
}
