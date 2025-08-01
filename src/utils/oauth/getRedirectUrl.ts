//카카오로 로그인 버튼을 눌렀을 때 리다이렉트 될 URL
export function getRedirectUrl(flow: 'login' | 'signUp'): string {
  const REST_API_KEY = process.env.NEXT_PUBLIC_OAUTH_APP_KEY;
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

  if (!REST_API_KEY) {
    throw new Error(
      'NEXT_PUBLIC_OAUTH_APP_KEY 환경변수가 설정되지 않았습니다.',
    );
  }

  if (!APP_URL) {
    throw new Error('NEXT_PUBLIC_APP_URL 환경변수가 설정되지 않았습니다.');
  }

  const REDIRECT_URI = `${APP_URL}/login/callback`;

  const params = new URLSearchParams({
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    state: flow,
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
}
