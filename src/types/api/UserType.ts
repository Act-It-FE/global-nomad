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

export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

export type SignUpResponse = User;

export type GetMyInfoResponse = User;

export interface UpdateMyInfoRequest {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}

export type UpdateMyInfoResponse = User;

export interface UploadProfileImageRequest {
  image: File;
}

export interface UploadProfileImageResponse {
  profileImageUrl: string;
}
