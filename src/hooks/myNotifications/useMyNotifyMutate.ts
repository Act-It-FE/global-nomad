import { useMutation, useQueryClient } from '@tanstack/react-query';

import notificationsApi from '@/api/notificationApi';

import myNotificationsQueryKeys from './queryKey';

export function useMyNotifyDelete(notificationId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsApi.deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: myNotificationsQueryKeys().all,
      });
    },
  });
}
