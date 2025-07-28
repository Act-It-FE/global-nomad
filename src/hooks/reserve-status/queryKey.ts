import {
  GetMyActivitiesParams,
  ReservationStatus,
  UpdateMyActivityReservationBody,
} from '@/api/types/myActivities';

export default function myActivitiesQueryKeys() {
  const all = ['myActivities'] as const;

  return {
    all,
    list: (params: GetMyActivitiesParams) => [...all, 'list', params] as const,
    detail: (id: number) => [...all, 'detail', id] as const,
    reservationDashboard: (
      activityId: number,
      params: { year: string; month: string },
    ) => [...all, 'reservationDashboard', activityId, params] as const,
    reservedSchedule: (activityId: number, params: { date: string }) =>
      [...all, 'reservedSchedule', activityId, params] as const,
    getReservations: (
      activityId: number,
      params: {
        cursorId?: number;
        size?: number;
        scheduleId: number;
        status: Extract<
          'declined' | 'pending' | 'confirmed',
          ReservationStatus
        >;
      },
    ) => [...all, 'getReservations', activityId, params] as const,
    patchReservations: (
      activityId: number,
      reservationId: number,
      body: UpdateMyActivityReservationBody,
    ) =>
      [...all, 'patchReservations', activityId, reservationId, body] as const,
  };
}
