import axios, { AxiosInstance } from 'axios';

const fetcher: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function isPublicRequest(method?: string, url?: string): boolean {
  if (!method || !url) return false;
  if (url.startsWith('/oauth')) {
    return true;
  }
  if (url === '/auth/login') {
    return true;
  }
  if (url === '/users') {
    return true;
  }
  if (method === 'get' && url.startsWith('/activities')) {
    return true;
  }
  return false;
}
const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};
fetcher.interceptors.request.use(
  (config) => {
    const { method, url } = config;
    if (!isPublicRequest(method, url)) {
      const token = getAccessToken();
      if (token && token.trim()) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);
fetcher.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('토큰이 만료되었습니다. 재로그인이 필요합니다.');
    }
    return Promise.reject(error);
  },
);

export { fetcher };
