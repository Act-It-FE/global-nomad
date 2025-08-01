import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import notificationsApi from '@/api/notificationApi';

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
      // 실제 운영에서는 토스트 메시지 등으로 사용자에게 피드백을 주는 것이 좋습니다.
      console.error('알림 삭제 중 에러:', error);
    },
  });
}
