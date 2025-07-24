export type OAuthAppProvider = 'google' | 'kakao';

export interface RegisterOAuthAppRequest {
  appKey: string;
  provider: OAuthAppProvider;
}

export interface OAuthAppResponse {
  id: number;
  teamId: string;
  appKey: string;
  provider: OAuthAppProvider;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string; // ISO 8601 형식
  updatedAt: string; // ISO 8601 형식
}

export interface OAuthResponse {
  //회원가입, 로그인 공통 type
  user: UserProfile;
  refreshToken: string;
  accessToken: string;
}
export interface OAuthLoginRequest {
  redirectUri: string;
  token: string;
}

export interface OAuthSignUpRequest extends OAuthLoginRequest {
  nickname: string;
}
