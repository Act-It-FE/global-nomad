import myActivitiesApi from '@/api/myActivities';

export default function myActivitiesQueryKeys() {
  const all = ['myActivities'] as const;

  return {
    all,
    getActs: (params: Parameters<typeof myActivitiesApi.get>[0]) =>
      [...all, 'getActs', params] as const,
    getDetail: (id: number) => [...all, 'getDetail', id] as const,
    getReservationDashboard: (
      activityId: number,
      params: Parameters<typeof myActivitiesApi.getReservationDashboard>[1],
    ) => [...all, 'getReservationDashboard', activityId, params] as const,
    getReservedSchedule: (
      activityId: number,
      params: Parameters<typeof myActivitiesApi.getReservedSchedule>[1],
    ) => [...all, 'getReservedSchedule', activityId, params] as const,
    getReservations: (
      activityId: number,
      params: Parameters<typeof myActivitiesApi.getReservations>[1],
    ) => [...all, 'getReservations', activityId, params] as const,
    patchReservations: (
      activityId: number,
      reservationId: number,
      body: Parameters<typeof myActivitiesApi.patchReservations>[2],
    ) =>
      [...all, 'patchReservations', activityId, reservationId, body] as const,
    deleteAct: (...arg: Parameters<typeof myActivitiesApi.delete>) =>
      [...all, 'deleteAct', ...arg] as const,
    patchAct: (...arg: Parameters<typeof myActivitiesApi.patch>) =>
      [...all, 'patchAct', ...arg] as const,
  };
}
