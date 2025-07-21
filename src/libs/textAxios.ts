import axios from 'axios';

/**
 * 환경에 따른 토큰 관리
 * 개발/테스트: 환경변수에서 토큰 가져오기
 * 프로덕션: 실제 인증 시스템 연동 (추후 구현)
 */
const getAuthToken = (): string => {
  // 개발 환경에서는 테스트용 토큰 사용
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_API_TEST_TOKEN || '';
  }

  // 프로덕션에서는 실제 인증 토큰 사용
  // TODO: 실제 인증 시스템 연동 (localStorage, cookies, 인증 상태 관리)
  return process.env.NEXT_PUBLIC_API_TOKEN || '';
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// 요청 인터셉터로 동적 토큰 주입
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터로 토큰 만료 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 처리 로직
      console.warn('토큰이 만료되었습니다. 재로그인이 필요합니다.');
      // TODO: 로그인 페이지로 리다이렉트 또는 토큰 갱신 로직
    }
    return Promise.reject(error);
  },
);

export default api;
