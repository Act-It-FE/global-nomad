import {
  ActivitiesResponse,
  ActivityWithSchedulesResponse,
  FindReservationsByMonthResponse,
  ReservationResponse,
  ReservationsListResponse,
  ReservationStatus,
  ReservedScheduleResponse,
  UpdateMyActivityBody,
  UpdateMyActivityReservationBody,
} from '@/api/types/myActivities';

import { fetcher } from '../libs/api';

const myActivitiesApi = {
  /** 내 체험 리스트 조회 */
  getMyActivities: (query?: { cursorId?: number; size?: number }) => {
    return fetcher.get<ActivitiesResponse>('/my-activities', {
      params: query,
    });
  },

  /** 내 체험 월별 예약 현황 조회 */
  getMyActivitiesReservationDashboard: (
    activityId: number,
    query: {
      /** YYYY 형식 (예시: 2025) */
      year: string;
      /** MM 형식 (예시: 07) */
      month: string;
    },
  ) => {
    return fetcher.get<FindReservationsByMonthResponse>(
      `/my-activities/${activityId}/reservation-dashboard`,
      {
        params: query,
      },
    );
  },

  /** 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회 */
  getMyActivitiesReservedSchedule: (
    activityId: number,
    query: {
      /** YYYY-MM-DD 형식 (예시: 2025-07-26) */
      date: string;
    },
  ) => {
    return fetcher.get<ReservedScheduleResponse>(
      `/my-activities/${activityId}/reserved-schedule`,
      {
        params: query,
      },
    );
  },

  /** 내 체험 예약 시간대별 예약 내역 조회 */
  getMyActivitiesReservations: (
    activityId: number,
    query: {
      cursorId?: number;
      size?: number;
      scheduleId: number;
      status: Extract<'declined' | 'pending' | 'confirmed', ReservationStatus>;
    },
  ) => {
    return fetcher.get<ReservationsListResponse>(
      `/my-activities/${activityId}/reservations`,
      {
        params: query,
      },
    );
  },

  /** 내 체험 예약 상태(승인, 거절) 업데이트 */
  patchMyActivitiesReservations: (
    activityId: number,
    reservationId: number,
    body: UpdateMyActivityReservationBody,
  ) => {
    return fetcher.patch<ReservationResponse>(
      `/my-activities/${activityId}/reservations/${reservationId}`,
      body,
    );
  },

  /** 내 체험 삭제 */
  deleteMyActivities: (activityId: number) => {
    return fetcher.delete<void>(`/my-activities/${activityId}`);
  },

  /** 내 체험 수정 */
  patchMyActivities: (activityId: number, body: UpdateMyActivityBody) => {
    return fetcher.patch<ActivityWithSchedulesResponse>(
      `/my-activities/${activityId}`,
      body,
    );
  },
};

export default myActivitiesApi;
