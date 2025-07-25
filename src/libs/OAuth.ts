import {
  OAuthAppProvider,
  OAuthAppRequest,
  OAuthAppResponse,
  OAuthLoginRequest,
  OAuthResponse,
  OAuthSignUpRequest,
} from '@/types/Auth';

import { fetcher } from '../api/api';

export const postApp = async (
  query: OAuthAppRequest,
): Promise<OAuthAppResponse> => {
  try {
    const response = await fetcher.post('/oauth/apps', query);
    return response.data;
  } catch {
    throw new Error('error');
  }
};
export const postSignUp = async (
  query: OAuthSignUpRequest,
  provider: OAuthAppProvider,
): Promise<OAuthResponse> => {
  try {
    const response = await fetcher.post(`/oauth/sign-up/${provider}`, query);
    return response.data;
  } catch {
    throw new Error('error');
  }
};
export const postLogin = async (
  query: OAuthLoginRequest,
): Promise<OAuthResponse> => {
  try {
    const response = await fetcher.post(`/oauth/sign-in/kakao`, { query });
    return response.data;
  } catch {
    throw new Error('error');
  }
};
