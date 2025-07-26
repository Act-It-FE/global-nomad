import {
  OAuthAppProvider,
  OAuthAppRequest,
  OAuthAppResponse,
  OAuthLoginRequest,
  OAuthResponse,
  OAuthSignUpRequest,
} from '@/types/Auth';

import apiClient from '../libs/apiClient';

const APP_KEY = process.env.NEXT_PUBLIC_OAUTH_APP_KEY;

const oAuthApi = {
  postApp: (provider: OAuthAppProvider) =>
    apiClient.post<OAuthAppRequest, OAuthAppResponse>(`/oauth/apps`, {
      appKey: APP_KEY,
      provider,
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
