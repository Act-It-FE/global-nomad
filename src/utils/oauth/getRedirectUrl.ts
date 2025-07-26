//카카오로 로그인 버튼을 눌렀을 때 리다이렉트 될 URL
export function getRedirectUrl(): string {
  const REST_API_KEY = process.env.NEXT_PUBLIC_OAUTH_APP_KEY!;
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/kakao`;

  const params = new URLSearchParams({
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
}
