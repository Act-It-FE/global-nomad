'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import oAuthApi from '@/api/oAuth';
import type {
  OAuthAppProvider,
  OAuthRequest,
  OAuthResponse,
} from '@/api/types/auth';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const code = useSearchParams().get('code');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
      // 1) 로그인 시도
      try {
        const data: OAuthResponse = await oAuthApi.postLogin(
          body,
          'kakao' as OAuthAppProvider,
        );
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        router.replace('/'); // 로그인 성공 후 이동
        return;
      } catch (loginErr: unknown) {
        // 2) 등록된 사용자가 아니면 회원가입으로
        if (
          loginErr instanceof Error &&
          loginErr.message === 'User not registered'
        ) {
          try {
            const signupData: OAuthResponse = await oAuthApi.postSignUp(
              body,
              'kakao' as OAuthAppProvider,
            );
            localStorage.setItem('accessToken', signupData.accessToken);
            localStorage.setItem('refreshToken', signupData.refreshToken);
            router.replace('/'); // 회원가입 후 이동
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
  }, [code, router]);
  return { error };
}
