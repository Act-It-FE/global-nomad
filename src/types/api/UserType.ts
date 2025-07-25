// 에러 메시지
export interface ErrorMessage {
  message: string;
}

// 유저 정보
export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// post /{teamId}/users : 회원가입
export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

export type SignUpResponse = User;

// GET /{teamId}/users/me : 내 정보 조회
export type GetMyInfoResponse = User;

// PATCH /{teamId}/users/me : 내 정보 수정
export interface UpdateMyInfoRequest {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}

export type UpdateMyInfoResponse = User;

// POST /{teamId}/users/me/image : 프로필 이미지 url 생성
export interface UploadProfileImageRequest {
  image: File;
}

export interface UploadProfileImageResponse {
  profileImageUrl: string;
}
