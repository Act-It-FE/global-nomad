import { GetNotificationsParams } from '@/api/types/notifications';

export default function myNotificationsQueryKeys() {
  const all = ['myNotifications'] as const;

  return {
    all,
    list: (params: GetNotificationsParams) => [...all, 'list', params] as const,
    detail: (id: number) => [...all, 'detail', id] as const,
  };
}
