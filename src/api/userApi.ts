import apiClient from '@/libs/apiClient';

import {
  GetMyInfoResponse,
  SignUpRequest,
  SignUpResponse,
  UpdateMyInfoRequest,
  UpdateMyInfoResponse,
  UploadProfileImageResponse,
} from './types/user';

const userApi = {
  // POST /{teamId}/users : 회원가입
  signUp: (data: SignUpRequest) => {
    return apiClient.post<SignUpRequest, SignUpResponse>('/users', data);
  },

  // GET /{teamId}/users/me : 내 정보 조회
  getMyInfo: () => {
    return apiClient.get<GetMyInfoResponse>('/users/me');
  },

  // PATCH /{teamId}/users/me : 내 정보 수정
  updateMyInfo: (data: UpdateMyInfoRequest) => {
    return apiClient.patch<UpdateMyInfoRequest, UpdateMyInfoResponse>(
      '/users/me',
      data,
    );
  },

  // POST /{teamId}/users/me/image : 프로필 이미지 url 생성
  uploadProfileImage: (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    return apiClient.post<FormData, UploadProfileImageResponse>(
      '/users/me/image',
      formData,
    );
  },
};

export default userApi;
