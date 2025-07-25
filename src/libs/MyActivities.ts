import axios from 'axios';

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
} from '@/types/MyActivities';

import { fetcher } from './api';

/** 내 체험 리스트 조회 */
export const getMyActivities = async (query?: {
  cursorId?: number;
  size?: number;
}) => {
  try {
    const response = await fetcher.get<ActivitiesResponse>('/my-activities', {
      params: query,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.status + ' ' + error.response?.data.message);
    }
    throw new Error('내 체험을 가져오는 데 실패했습니다');
  }
};

/** 내 체험 월별 예약 현황 조회 */
export const getMyActivitiesReservationDashboard = async (
  activityId: number,
  query: {
    year: string;
    month: string;
  },
) => {
  try {
    const response = await fetcher.get<FindReservationsByMonthResponse>(
      `/my-activities/${activityId}/reservation-dashboard`,
      {
        params: query,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.status + ' ' + error.response?.data.message);
    }
    throw new Error('월별 예약 현황을 가져오는 데 실패했습니다');
  }
};

/** 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회 */
export const getMyActivitiesReservedSchedule = async (
  activityId: number,
  query: {
    date: string;
  },
) => {
  try {
    const response = await fetcher.get<ReservedScheduleResponse>(
      `/my-activities/${activityId}/reserved-schedule`,
      {
        params: query,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.status + ' ' + error.response?.data.message);
    }
    throw new Error('날짜별 예약 정보를 가져오는 데 실패했습니다');
  }
};

/** 내 체험 예약 시간대별 예약 내역 조회 */
export const getMyActivitiesReservations = async (
  activityId: number,
  query?: {
    cursorId?: number;
    size?: number;
    scheduleId: number;
    status: Extract<'declined' | 'pending' | 'confirmed', ReservationStatus>;
  },
) => {
  try {
    const response = await fetcher.get<ReservationsListResponse>(
      `/my-activities/${activityId}/reservations`,
      {
        params: query,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.status + ' ' + error.response?.data.message);
    }
    throw new Error('예약 시간대별 예약 내역을 가져오는 데 실패했습니다');
  }
};

/** 내 체험 예약 상태(승인, 거절) 업데이트 */
export const patchMyActivitiesReservations = async (
  activityId: number,
  reservationId: number,
  body: UpdateMyActivityReservationBody,
) => {
  try {
    const response = await fetcher.patch<ReservationResponse>(
      `/my-activities/${activityId}/reservations/${reservationId}`,
      body,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.status + ' ' + error.response?.data.message);
    }
    throw new Error('예약 상태를 수정하는 데 실패했습니다');
  }
};

/** 내 체험 삭제 */
export const deleteMyActivities = async (activityId: number) => {
  try {
    const response = await fetcher.delete<void>(`/my-activities/${activityId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.status + ' ' + error.response?.data.message);
    }
    throw new Error('내 체험을 삭제하는 데 실패했습니다');
  }
};

/** 내 체험 수정 */
export const patchMyActivities = async (
  activityId: number,
  body: UpdateMyActivityBody,
) => {
  try {
    const response = await fetcher.patch<ActivityWithSchedulesResponse>(
      `/my-activities/${activityId}`,
      body,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.status + ' ' + error.response?.data.message);
    }
    throw new Error('내 체험을 수정하는 데 실패했습니다');
  }
};
