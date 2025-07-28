import {
  OAuthAppProvider,
  OAuthAppRequest,
  OAuthAppResponse,
  OAuthLoginRequest,
  OAuthResponse,
  OAuthSignUpRequest,
} from '@/api/types/auth';

import apiClient from '../libs/apiClient';

const APP_KEY = process.env.NEXT_PUBLIC_OAUTH_APP_KEY ?? '';

if (!APP_KEY) {
  throw new Error('APP_KEY가 존재하지 않습니다.');
}

const oAuthApi = {
  postApp: () =>
    apiClient.post<OAuthAppRequest, OAuthAppResponse>(`/oauth/apps`, {
      appKey: APP_KEY,
      provider: 'kakao',
    }),

  postSignUp: (body: OAuthSignUpRequest, provider: OAuthAppProvider) =>
    apiClient.post<OAuthSignUpRequest, OAuthResponse>(
      `/oauth/sign-up/${provider}`,
      body,
    ),

  postLogin: (body: OAuthLoginRequest, provider: OAuthAppProvider) =>
    apiClient.post<OAuthLoginRequest, OAuthResponse>(
      `/oauth/sign-in/${provider}`,
      body,
    ),
};
export default oAuthApi;
