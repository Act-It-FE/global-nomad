import { useMutation, useQueryClient } from '@tanstack/react-query';

import myActivitiesApi from '@/api/myActivities';
import {
  UpdateMyActivityBody,
  UpdateMyActivityReservationBody,
} from '@/api/types/myActivities';

import myActivitiesQueryKeys from './queryKey';

export function useMyActReservationMutate(
  activityId: number,
  reservationId: number,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateMyActivityReservationBody) =>
      myActivitiesApi.patchReservations(activityId, reservationId, body),
    onSuccess: () => {
      // 내 체험 목록 새로고침
      queryClient.invalidateQueries({
        queryKey: myActivitiesQueryKeys().getList({}),
      });
      // 예약 관련 모든 쿼리 새로고침 (대시보드, 스케줄, 목록 등)
      queryClient.invalidateQueries({
        queryKey: myActivitiesQueryKeys().all,
      });
    },
  });
}

export function useMyActMutate(activityId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateMyActivityBody) =>
      myActivitiesApi.patch(activityId, body),
    onSuccess: () => {
      // 내 체험 목록 새로고침
      queryClient.invalidateQueries({
        queryKey: myActivitiesQueryKeys().getList({}),
      });
    },
  });
}
