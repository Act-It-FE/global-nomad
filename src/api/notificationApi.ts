import apiClient from '@/libs/apiClient';

import {
  GetNotificationsParams,
  MyNotificationsResponse,
} from './types/notifications';

export const notificationsApi = {
  getMyNotifications: (params?: GetNotificationsParams) => {
    return apiClient.get<MyNotificationsResponse>('/my-notifications', {
      params,
    });
  },
  deleteNotification: (notificationId: number) => {
    return apiClient.delete<void>(`/my-notifications/${notificationId}`);
  },
};
