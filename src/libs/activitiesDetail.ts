import { isAxiosError } from 'axios';

import { fetcher } from '@/api/api';
import {
  ActivitiesDetail,
  ActivityReviewResponse,
} from '@/types/apis/Activities';

// 체험 상세 조회
export const getActivityDetail = async (
  activityId: number,
): Promise<ActivitiesDetail> => {
  try {
    const response = await fetcher.get(`/activities/${activityId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 404) {
        console.error('요청하신 체험 정보를 찾을 수 없습니다.');
        throw new Error('요청하신 체험 정보를 찾을 수 없습니다.');
      }

      console.error('알 수 없는 오류가 발생했습니다.');
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }

    console.error('네트워크 에러 발생:', error);
    throw new Error('네트워크 에러가 발생했습니다.');
  }
};

// 체험 리뷰 조회
export const getActivityReviews = async (
  activityId: number,
): Promise<ActivityReviewResponse> => {
  try {
    const response = await fetcher.get(`/activities/${activityId}/reviews`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('체험 리뷰 조회에 실패했습니다.', error.message);
    } else {
      console.error('알 수 없는 오류가 발생했습니다.', error);
    }
    throw new Error('체험 리뷰 조회 중 오류가 발생했습니다.');
  }
};
