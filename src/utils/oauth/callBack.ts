//카카오 로그인 동의 후 파라미터로 code와 함께 Redirect된 인가 코드로 accessToken, refreshToken 발급 받아 로컬스토리지에 저장
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import oAuthApi from '@/api/oAuth';
import { OAuthAppProvider, OAuthRequest, OAuthResponse } from '@/types/Auth';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get('code');

  useEffect(() => {
    if (!code) {
      throw new Error('인가 코드가 없습니다.');
      return;
    }

    const body: OAuthRequest = {
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/kakao`,
      token: code,
      nickname: '',
    };

    async function handleSignUp() {
      try {
        const data: OAuthResponse = await oAuthApi.postSignUp(
          body,
          'kakao' as OAuthAppProvider,
        );
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        router.replace('/'); //로그인 후 이동할 주소
      } catch {
        throw new Error('로그인 중 오류가 발생했습니다.');
      }
    }

    handleSignUp();
  }, [code, router]);
}
