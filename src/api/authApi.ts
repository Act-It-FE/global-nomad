import apiClient from '@/libs/apiClient';

import { LoginRequest, LoginResponse, Token } from './types/auth';

export const authApi = {
  login: (data: LoginRequest) => {
    return apiClient.post<LoginRequest, LoginResponse>('/auth/login', data);
  },
  getTokens: (data: Token) => {
    return apiClient.post<Token, Token>('/auth/tokens', data);
  },
};
