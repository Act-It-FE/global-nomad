import { useQuery } from '@tanstack/react-query';

import myActivitiesApi from '@/api/myActivities';
import {
  GetMyActivitiesParams,
  ReservationStatus,
} from '@/api/types/myActivities';

import myActivitiesQueryKeys from './queryKey';

export function useMyActQuery(params?: GetMyActivitiesParams) {
  return useQuery({
    queryKey: myActivitiesQueryKeys().getList(params || {}),
    queryFn: () => {
      return myActivitiesApi.get(params);
    },
  });
}

export function useMyActReservationDashboard(
  activityId: number,
  params: { year: string; month: string },
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: myActivitiesQueryKeys().getReservationDashboard(
      activityId,
      params,
    ),
    queryFn: () => {
      return myActivitiesApi.getReservationDashboard(activityId, params);
    },
    enabled: options?.enabled ?? true,
  });
}

export function useMyActReservedSchedule(
  activityId: number,
  params: { date: string },
) {
  return useQuery({
    queryKey: myActivitiesQueryKeys().getReservedSchedule(activityId, params),
    queryFn: () => {
      return myActivitiesApi.getReservedSchedule(activityId, params);
    },
  });
}

export function useMyActReservations(
  activityId: number,
  params: GetMyActivitiesParams & {
    scheduleId: number;
    status: Extract<'declined' | 'pending' | 'confirmed', ReservationStatus>;
  },
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: myActivitiesQueryKeys().getReservations(activityId, params),
    queryFn: () => {
      return myActivitiesApi.getReservations(activityId, params);
    },
    enabled: options?.enabled ?? true,
  });
}
