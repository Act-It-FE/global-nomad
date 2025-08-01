export function getRedirectUrl(flow: 'login' | 'signUp'): string {
  const REST_API_KEY = process.env.NEXT_PUBLIC_OAUTH_APP_KEY;
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
  const VERCEL_HOST = process.env.NEXT_PUBLIC_VERCEL_URL;

  if (!REST_API_KEY) {
    throw new Error(
      'NEXT_PUBLIC_OAUTH_APP_KEY 환경변수가 설정되지 않았습니다.',
    );
  }
  if (!APP_URL) {
    throw new Error('NEXT_PUBLIC_APP_URL 환경변수가 설정되지 않았습니다.');
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl =
    isProduction && VERCEL_HOST
      ? VERCEL_HOST.replace(/\/$/, '')
      : APP_URL.replace(/\/$/, '');

  const REDIRECT_URI = `${baseUrl}/login/callback`;

  const params = new URLSearchParams({
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    state: flow,
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
}
