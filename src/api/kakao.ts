import apiClient from '../libs/apiClient';

const ACCESS_TOKEN = () => localStorage.getItem('accessToken')!;

export interface KakaoProfile {
  id: number;
  properties: {
    nickname: string;
  };
  kakao_account: {
    email?: string;
  };
}

const kakaoApi = {
  getProfile: (): Promise<KakaoProfile> =>
    apiClient.post<null, KakaoProfile>(
      'https://kapi.kakao.com/v2/user/me',
      null,
      { headers: { Authorization: `Bearer ${ACCESS_TOKEN()}` } },
    ),

  logout: (): Promise<void> =>
    apiClient.post<null, void>('https://kapi.kakao.com/v1/user/logout', null, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN()}` },
    }),

  unlink: (): Promise<void> =>
    apiClient.post<null, void>('https://kapi.kakao.com/v1/user/unlink', null, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN()}` },
    }),
};

export default kakaoApi;
