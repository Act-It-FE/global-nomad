import { AxiosRequestConfig } from 'axios';

import { fetcher } from './api';

const apiClient = {
  get: async <R>(url: string, config?: AxiosRequestConfig): Promise<R> => {
    const response = await fetcher.get<R>(url, config);
    return response.data;
  },
  post: async <T, R>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const response = await fetcher.post<R>(url, data, config);
    return response.data;
  },
  postOnlyToken: async <R>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const response = await fetcher.post<R>(url, config);
    return response.data;
  },
  put: async <T, R>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const response = await fetcher.put<R>(url, data, config);
    return response.data;
  },
  patch: async <T, R>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const response = await fetcher.patch<R>(url, data, config);
    return response.data;
  },
  delete: async <R>(url: string, config?: AxiosRequestConfig): Promise<R> => {
    const response = await fetcher.delete<R>(url, config);
    return response.data;
  },
};

export default apiClient;
