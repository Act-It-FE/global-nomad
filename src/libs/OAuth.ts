import {
  OAuthAppProvider,
  OAuthAppRequest,
  OAuthAppResponse,
  OAuthLoginRequest,
  OAuthResponse,
  OAuthSignUpRequest,
} from '@/types/Auth';

import apiClient from './apiClient';

const oAuthApi = {
  postApp: (body: OAuthAppRequest): Promise<OAuthAppResponse> =>
    apiClient.post<OAuthAppRequest, OAuthAppResponse>('/oauth/apps', body),

  postSignUp: (
    body: OAuthSignUpRequest,
    provider: OAuthAppProvider,
  ): Promise<OAuthResponse> =>
    apiClient.post<OAuthSignUpRequest, OAuthResponse>(
      `/oauth/sign-up/${provider}`,
      body,
    ),

  postLogin: (
    body: OAuthLoginRequest,
    provider: OAuthAppProvider,
  ): Promise<OAuthResponse> =>
    apiClient.post<OAuthLoginRequest, OAuthResponse>(
      `/oauth/sign-in/${provider}`,
      body,
    ),
};
export default oAuthApi;
