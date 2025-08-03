import { useQuery } from '@tanstack/react-query';

import activitiesApi from '@/api/activitiesApi';
import { AvailableSchedule } from '@/api/types/activities';

export const useAvailableSchedule = (
  activityId: number,
  year: string,
  month: string,
) => {
  return useQuery<AvailableSchedule[]>({
    queryKey: ['availableSchedule', activityId, year, month],
    queryFn: () =>
      activitiesApi.getAvailableSchedule(activityId, { year, month }),
    enabled: !!activityId && !!year && !!month,
    staleTime: 1000 * 60 * 3,
  });
};
