import { useMutation, useQueryClient } from '@tanstack/react-query';

import reservationsApi from '@/api/reservationApi';
import { PatchReservationStatusBody } from '@/api/types/reservations';

import reservationsQueryKeys from './queryKeys';

export function useMyReservationsCancel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reservationsId,
      status,
    }: {
      reservationsId: number;
      status: PatchReservationStatusBody['status'];
    }) => reservationsApi.patchReservationStatus(reservationsId, { status }),
    onSuccess: (_, variables) => {
      // variables에서 reservationsId를 가져와서 해당 예약만 새로고침
      queryClient.invalidateQueries({
        queryKey: reservationsQueryKeys().detail(variables.reservationsId),
      });
    },
  });
}
