import axios from 'axios';

import { ActivitiesResponse } from '@/types/MyActivities';

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
    if (!axios.isAxiosError(error)) {
      throw new Error('내 체험을 가져오는 데 실패했습니다');
    }
    throw error;
  }
};
