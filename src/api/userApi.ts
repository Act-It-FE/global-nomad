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
  signUp: (data: SignUpRequest) => {
    return apiClient.post<SignUpRequest, SignUpResponse>('/users', data);
  },

  getMyInfo: () => {
    return apiClient.get<GetMyInfoResponse>('/users/me');
  },

  updateMyInfo: (data: UpdateMyInfoRequest) => {
    return apiClient.patch<UpdateMyInfoRequest, UpdateMyInfoResponse>(
      '/users/me',
      data,
    );
  },

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
