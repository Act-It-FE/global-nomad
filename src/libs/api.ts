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
  if (method === 'get' && url.startsWith('/my-activities')) {
    return true;
  }
  return false;
}

fetcher.interceptors.request.use(
  (config) => {
    const { method, url } = config;
    if (!isPublicRequest(method, url)) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export { fetcher };
