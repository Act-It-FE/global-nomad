import { useQuery } from '@tanstack/react-query';

import myActivitiesApi from '@/api/myActivities';
import {
  GetMyActivitiesParams,
  ReservationStatus,
} from '@/api/types/myActivities';

import myActivitiesQueryKeys from './queryKey';

export function useMyActivitiesQuery(params?: GetMyActivitiesParams) {
  return useQuery({
    queryKey: myActivitiesQueryKeys().list(params || {}),
    queryFn: () => {
      return myActivitiesApi.get(params);
    },
  });
}

export function useMyActReservationDashboard(
  activityId: number,
  params: { year: string; month: string },
) {
  return useQuery({
    queryKey: myActivitiesQueryKeys().reservationDashboard(activityId, params),
    queryFn: () => {
      return myActivitiesApi.getReservationDashboard(activityId, params);
    },
  });
}

export function useMyActivitiesReservedSchedule(
  activityId: number,
  params: { date: string },
) {
  return useQuery({
    queryKey: myActivitiesQueryKeys().reservedSchedule(activityId, params),
    queryFn: () => {
      return myActivitiesApi.getReservedSchedule(activityId, params);
    },
  });
}

export function useMyActivitiesReservations(
  activityId: number,
  params: {
    cursorId?: number;
    size?: number;
    scheduleId: number;
    status: Extract<'declined' | 'pending' | 'confirmed', ReservationStatus>;
  },
) {
  return useQuery({
    queryKey: myActivitiesQueryKeys().getReservations(activityId, params),
    queryFn: () => {
      return myActivitiesApi.getReservations(activityId, params);
    },
  });
}
