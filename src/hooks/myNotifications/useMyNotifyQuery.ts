import { useInfiniteQuery } from '@tanstack/react-query';

import notificationsApi from '@/api/notificationApi';
import { GetNotificationsParams } from '@/api/types/notifications';

import myNotificationsQueryKeys from './queryKey';

export default function useMyNotifyQuery(params?: GetNotificationsParams) {
  return useInfiniteQuery({
    queryKey: myNotificationsQueryKeys().list(params || {}),
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      const requestParams = { ...(params || {}), cursorId: pageParam };
      return notificationsApi.getMyNotifications(requestParams);
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.cursorId,
    refetchInterval: 60000, // 1분마다 다시 가져오기
  });
}
