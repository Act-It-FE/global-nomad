import { isAxiosError } from 'axios';

import { fetcher } from '@/api/api';
import {
  ActivitiesDetail,
  ActivityImageUploadResponse,
  ActivityRegisterPayload,
  ActivityResponse,
  ActivityReviewResponse,
  AvailableSchedule,
  GetActivitiesParams,
  ReservationRequest,
  ReservationResponse,
} from '@/types/apis/Activities';

//체험 리스트 조회
export const getActivities = async (
  params: GetActivitiesParams,
): Promise<ActivityResponse> => {
  try {
    const response = await fetcher.get(`/activities`, { params });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('체험 리스트 조회에 실패했습니다.', error.message);
    } else {
      console.error('알 수 없는 오류가 발생했습니다.', error);
    }
    throw new Error('체험 리스트 조회 중 오류가 발생했습니다.');
  }
};

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

//체험 예약 가능일 조회
export const getAvailableSchedule = async (
  activityId: number,
  year: string,
  month: string,
): Promise<AvailableSchedule[]> => {
  try {
    // 예약가능 월 은 두자리여야 해서 두자리를 입력받을 수 있게했습니다. ex) 1월 -> 01
    const formattedMonth = month.padStart(2, '0');

    const response = await fetcher.get(
      `/activities/${activityId}/available-schedule`,
      {
        params: {
          year,
          month: formattedMonth,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('체험 예약 가능일 조회에 실패했습니다.', error.message);
    } else {
      console.error('알 수 없는 네트워크 오류가 발생했습니다.', error);
    }
    throw new Error('체험 예약 가능일 조회 중 오류가 발생했습니다.');
  }
};

// 체험 등록
export const createActivity = async (
  payload: ActivityRegisterPayload,
): Promise<void> => {
  try {
    await fetcher.post(`/activities`, payload);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('체험 등록에 실패했습니다.', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error('체험 등록 중 오류가 발생했습니다.');
    }
    console.error('네트워크 오류입니다.', error);
    throw new Error('네트워크 오류가 발생했습니다.');
  }
};

// 체험 예약 신청
export const postReservation = async (
  activityId: number,
  payload: ReservationRequest,
): Promise<ReservationResponse> => {
  try {
    const response = await fetcher.post(
      `/activities/${activityId}/reservations`,
      payload,
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('체험 예약 신청에 실패했습니다.', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error('체험 예약 신청 중 오류가 발생했습니다.');
    }
    console.error('네트워크 오류입니다.', error);
    throw new Error('네트워크 오류가 발생했습니다.');
  }
};

//체험 이미지 URL 생성
export const uploadActivityImage = async (
  file: File,
): Promise<ActivityImageUploadResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetcher.post(`/activities/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('이미지 업로드 실패', error);
    throw new Error('이미지 업로드에 실패했습니다.');
  }
};
