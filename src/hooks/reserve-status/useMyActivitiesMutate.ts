import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import myActivitiesApi from '@/api/myActivities';
import { UpdateMyActivityReservationBody } from '@/api/types/myActivities';

import myActivitiesQueryKeys from './queryKey';

export function useMyActivitiesMutate(
  activityId: number,
  reservationId: number,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateMyActivityReservationBody) =>
      myActivitiesApi.patchReservations(activityId, reservationId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: myActivitiesQueryKeys().list({}),
      });
    },
  });
}
