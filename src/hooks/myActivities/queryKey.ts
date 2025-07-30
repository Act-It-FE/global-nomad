import myActivitiesApi from '@/api/myActivities';

export default function myActivitiesQueryKeys() {
  const all = ['myActivities'] as const;

  return {
    all,
    getActs: (params: Parameters<typeof myActivitiesApi.get>[0]) =>
      [...all, 'getActs', params] as const,
    getDetail: (id: number) => [...all, 'getDetail', id] as const,
    getReservationDashboard: (
      ...arg: Parameters<typeof myActivitiesApi.getReservationDashboard>
    ) => [...all, 'getReservationDashboard', ...arg] as const,
    getReservedSchedule: (
      ...arg: Parameters<typeof myActivitiesApi.getReservedSchedule>
    ) => [...all, 'getReservedSchedule', ...arg] as const,
    getReservations: (
      ...arg: Parameters<typeof myActivitiesApi.getReservations>
    ) => [...all, 'getReservations', ...arg] as const,
    patchReservations: (
      ...arg: Parameters<typeof myActivitiesApi.patchReservations>
    ) => [...all, 'patchReservations', ...arg] as const,
    deleteAct: (...arg: Parameters<typeof myActivitiesApi.delete>) =>
      [...all, 'deleteAct', ...arg] as const,
    patchAct: (...arg: Parameters<typeof myActivitiesApi.patch>) =>
      [...all, 'patchAct', ...arg] as const,
  };
}
