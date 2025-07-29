import { useQuery } from '@tanstack/react-query';

import activitiesDetailApi from '@/api/activitiesApi';
import { GetActivitiesParams } from '@/api/types/activities';

export default function useActivitiesQuery(params: GetActivitiesParams) {
  return useQuery({
    queryKey: ['activities', params],
    queryFn: () => activitiesDetailApi.get(params),
    staleTime: 0, // 실시간 반영을 위해 0초로 설정!
  });
}
