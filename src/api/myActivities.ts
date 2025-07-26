import apiClient from '@/libs/apiClient';

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
} from './types/myActivities';

const myActivitiesApi = {
  /** 내 체험 리스트 조회 */
  get: (query?: { cursorId?: number; size?: number }) => {
    return apiClient.get<ActivitiesResponse>('/my-activities', {
      params: query,
    });
  },

  /** 내 체험 월별 예약 현황 조회 */
  getReservationDashboard: (
    activityId: number,
    query: {
      /** YYYY 형식 (예시: 2025) */
      year: string;
      /** MM 형식 (예시: 07) */
      month: string;
    },
  ) => {
    return apiClient.get<FindReservationsByMonthResponse>(
      `/my-activities/${activityId}/reservation-dashboard`,
      {
        params: query,
      },
    );
  },

  /** 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회 */
  getReservedSchedule: (
    activityId: number,
    query: {
      /** YYYY-MM-DD 형식 (예시: 2025-07-26) */
      date: string;
    },
  ) => {
    return apiClient.get<ReservedScheduleResponse>(
      `/my-activities/${activityId}/reserved-schedule`,
      {
        params: query,
      },
    );
  },

  /** 내 체험 예약 시간대별 예약 내역 조회 */
  getReservations: (
    activityId: number,
    query: {
      cursorId?: number;
      size?: number;
      scheduleId: number;
      status: Extract<'declined' | 'pending' | 'confirmed', ReservationStatus>;
    },
  ) => {
    return apiClient.get<ReservationsListResponse>(
      `/my-activities/${activityId}/reservations`,
      {
        params: query,
      },
    );
  },

  /** 내 체험 예약 상태(승인, 거절) 업데이트 */
  patchReservations: (
    activityId: number,
    reservationId: number,
    body: UpdateMyActivityReservationBody,
  ) => {
    return apiClient.patch<
      UpdateMyActivityReservationBody,
      ReservationResponse
    >(`/my-activities/${activityId}/reservations/${reservationId}`, body);
  },

  /** 내 체험 삭제 */
  delete: (activityId: number) => {
    return apiClient.delete<void>(`/my-activities/${activityId}`);
  },

  /** 내 체험 수정 */
  patch: (activityId: number, body: UpdateMyActivityBody) => {
    return apiClient.patch<UpdateMyActivityBody, ActivityWithSchedulesResponse>(
      `/my-activities/${activityId}`,
      body,
    );
  },
};

export default myActivitiesApi;
