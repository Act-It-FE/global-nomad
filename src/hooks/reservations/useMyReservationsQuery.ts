import { useQuery } from '@tanstack/react-query';

import reservationsApi from '@/api/reservationApi';
import { GetReservationsParams } from '@/api/types/reservations';

import reservationsQueryKeys from './queryKeys';

export default function useMyReservationsQuery(params: GetReservationsParams) {
  return useQuery({
    queryKey: reservationsQueryKeys().list(params),
    queryFn: () => reservationsApi.getMyReservations(params),
  });
}
