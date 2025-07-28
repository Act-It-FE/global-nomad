export type OAuthAppProvider = 'google' | 'kakao';

interface At {
  createdAt: string; // ISO 8601 형식
  updatedAt: string; // ISO 8601 형식
}

export interface ImageUrl {
  profileImageUrl?: string | null;
}

export interface UserProfile extends At, ImageUrl {
  id: number;
  email: string;
  nickname: string;
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

// POST /{teamId}/users : 회원가입
export interface SignUpRequest extends LoginRequest {
  nickname: string;
}

export type SignUpResponse = UserProfile;

// GET /{teamId}/users/me : 내 정보 조회
export type GetMyInfoResponse = UserProfile;

// PATCH /{teamId}/users/me : 내 정보 수정
export interface UpdateMyInfoRequest extends ImageUrl {
  nickname?: string;
  newPassword?: string;
}

export type UpdateMyInfoResponse = UserProfile;

// POST /{teamId}/users/me/image : 프로필 이미지 url 생성
export interface UploadProfileImageRequest {
  image: File;
}

export interface UploadProfileImageResponse {
  profileImageUrl: string;
}
