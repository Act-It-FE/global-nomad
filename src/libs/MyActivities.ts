import axios from 'axios';

import {
  ActivitiesResponse,
  FindReservationsByMonthResponse,
} from '@/types/MyActivities';

import { fetcher } from './api';

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
