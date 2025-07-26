import apiClient from '@/libs/apiClient';

import { LoginRequest, LoginResponse, Token } from './types/auth';

export const authApi = {
  login: (data: LoginRequest) => {
    return apiClient.post<LoginRequest, LoginResponse>('/auth/login', data);
  },
  refreshTokens: () => {
    return apiClient.postOnlyToken<Token>('/auth/tokens');
  },
};
