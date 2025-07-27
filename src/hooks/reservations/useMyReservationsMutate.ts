import { useMutation, useQueryClient } from '@tanstack/react-query';

import reservationsApi from '@/api/reservationApi';
import {
  PatchReservationStatusBody,
  PostReviewBody,
} from '@/api/types/reservations';

import reservationsQueryKeys from './queryKeys';

export function useMyReservationsCancel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: PatchReservationStatusBody['status'];
    }) => reservationsApi.patchReservationStatus(reservationId, { status }),
    onSuccess: (_, variables) => {
      // 해당 예약 상세 새로고침
      queryClient.invalidateQueries({
        queryKey: reservationsQueryKeys().detail(variables.reservationId),
      });
      // 목록도 새로고침 (리뷰 상태 반영)
      queryClient.invalidateQueries({
        queryKey: reservationsQueryKeys().all,
      });
    },
  });
}

export function useMyReservationsReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reservationId,
      body,
    }: {
      reservationId: number;
      body: PostReviewBody;
    }) => reservationsApi.postReservationReview(reservationId, body),
    onSuccess: (_, variables) => {
      // 해당 예약 상세 새로고침
      queryClient.invalidateQueries({
        queryKey: reservationsQueryKeys().detail(variables.reservationId),
      });
      // 목록도 새로고침 (리뷰 상태 반영)
      queryClient.invalidateQueries({
        queryKey: reservationsQueryKeys().all,
      });
    },
  });
}
