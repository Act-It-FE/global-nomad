import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import notificationsApi from '@/api/notificationApi';
import getErrorMessage from '@/utils/getErrorMessage';

import myNotificationsQueryKeys from './queryKey';

export function useMyNotifyDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => {
      return notificationsApi.deleteNotification(notificationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: myNotificationsQueryKeys().all,
      });
    },
    onError: (error: AxiosError) => {
      getErrorMessage(error, '알림 삭제를 실패하였습니다!');
    },
  });
}
