import { useInfiniteQuery } from '@tanstack/react-query';

import reservationsApi from '@/api/reservationApi';
import { GetReservationsParams } from '@/api/types/reservations';

import reservationsQueryKeys from './queryKeys';

export default function useMyReservationsQuery(params?: GetReservationsParams) {
  return useInfiniteQuery({
    queryKey: reservationsQueryKeys().list(params || {}),
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      const requestParams = { ...(params || {}), cursorId: pageParam };
      return reservationsApi.getMyReservations(requestParams);
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });
}
