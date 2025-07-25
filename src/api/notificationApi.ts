import { fetcher } from '@/libs/api';

import {
  GetNotificationsParams,
  MyNotificationsResponse,
} from './types/notifications';

export const notificationsApi = {
  getMyNotifications: (params?: GetNotificationsParams) => {
    return fetcher.get<MyNotificationsResponse>('/my-notifications', {
      params,
    });
  },
  deleteNotification: (notificationId: number) => {
    return fetcher.delete<void>(`/my-notifications/${notificationId}`);
  },
};
