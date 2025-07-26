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
  body: OAuthAppRequest,
): Promise<OAuthAppResponse> => {
  try {
    const response = await fetcher.post<OAuthAppResponse>('/oauth/apps', body);
    return response.data;
  } catch {
    throw new Error('error');
  }
};
export const postSignUp = async (
  body: OAuthSignUpRequest,
  provider: OAuthAppProvider,
): Promise<OAuthResponse> => {
  try {
    const response = await fetcher.post<OAuthResponse>(
      `/oauth/sign-up/${provider}`,
      body,
    );
    return response.data;
  } catch {
    throw new Error('간편 회원 가입에 실패하였습니다..');
  }
};
export const postLogin = async (
  body: OAuthLoginRequest,
  provider: OAuthAppProvider,
): Promise<OAuthResponse> => {
  try {
    const response = await fetcher.post<OAuthResponse>(
      `/oauth/sign-in/${provider}`,
      body,
    );
    return response.data;
  } catch {
    throw new Error('간편 로그인에 실패하였습니다.');
  }
};
