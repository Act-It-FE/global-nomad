import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';

const fetcher: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

const getRefreshToken = (): string | null =>
  typeof window === 'undefined' ? null : localStorage.getItem('refreshToken');

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
const refreshFetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
});

fetcher.interceptors.response.use(
  (res) => res,
  async (
    error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } },
  ) => {
    const originalReq = error.config;
    if (
      error.response?.status === 401 &&
      originalReq &&
      !originalReq._retry &&
      !originalReq.url?.includes('/auth/refresh')
    ) {
      originalReq._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token available');
        window.alert('세션이 만료되었습니다. 다시 로그인해주세요.');

        const { data } = await refreshFetcher.post<{
          accessToken: string;
          refreshToken: string;
        }>('/auth/refresh', { refreshToken });

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        if (originalReq.headers) {
          const headers = originalReq.headers as AxiosRequestHeaders;
          headers['Authorization'] = `Bearer ${data.accessToken}`;
        }
        return fetcher(originalReq);
      } catch (refreshError) {
        console.warn('토큰 갱신 실패:', refreshError);
        window.alert('실패했습니다.');
      }
    }

    return Promise.reject(error);
  },
);

export { fetcher };
