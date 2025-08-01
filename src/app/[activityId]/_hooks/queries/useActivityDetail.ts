import { useQuery } from '@tanstack/react-query';

import activitiesApi from '@/api/activitiesApi';
import { ActivitiesDetail } from '@/api/types/activities';

export const useActivityDetail = (activityId: number) => {
  return useQuery<ActivitiesDetail>({
    queryKey: ['activityDetail', activityId],
    queryFn: () => activitiesApi.getDetail(activityId),
    enabled: !!activityId,
    staleTime: 1000 * 60 * 5,
  });
};
