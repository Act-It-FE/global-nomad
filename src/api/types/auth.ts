export type OAuthAppProvider = 'google' | 'kakao';

interface At {
  createdAt: string; // ISO 8601 형식
  updatedAt: string; // ISO 8601 형식
}
//oauth req
export interface OAuthAppRequest {
  appKey: string;
  provider: OAuthAppProvider;
}
//oauth res
export interface OAuthAppResponse extends At, OAuthAppRequest {
  id: number;
  teamId: string;
}
//회원가입 response, 내 정보 조회
export interface UserProfile extends At, ImageUrl {
  id: number;
  email: string;
  nickname: string;
}
//토큰 재발급 res
export interface Token {
  refreshToken: string;
  accessToken: string;
}
//회원가입, 로그인 공통 type //auth login res//oauth signup res//oauth login res
export interface OAuthResponse extends Token {
  user: UserProfile;
}

//oauth login req
export interface OAuthLoginRequest {
  redirectUri: string;
  token: string;
}
//oauth signup req
export interface OAuthSignUpRequest extends OAuthLoginRequest {
  nickname: string;
}
//auth login req
export interface LoginRequest {
  email: string;
  password: string;
}
//auth login res
export interface LoginResponse extends Token {
  user: UserProfile;
}

export interface SignUp extends LoginRequest {
  nickname: string;
}
//내 정보 수정
export interface EditUserProfile extends ImageUrl {
  nickname?: string;
  newPassword: string;
}
export interface ImageUrl {
  profileImageUrl?: string | null;
}
