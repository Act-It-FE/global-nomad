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
  GetAvailableSchduleParams,
  ReservationRequest,
  ReservationResponse,
} from '@/types/apis/Activities';

//체험 리스트 조회
export const getActivities = async ({
  query,
}: {
  query?: GetActivitiesParams;
}): Promise<ActivityResponse> => {
  try {
    const response = await fetcher.get(`/activities`, {
      params: query,
    });
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
      const serverMessage = error.response?.data?.message;
      if (status === 404) {
        const message =
          serverMessage || '요청하신 체험 정보를 찾을 수 없습니다.';
        console.error('체험 상세 조회 실패:', message);
        throw new Error(message);
      }
      console.error('체험 상세 조회 실패:', serverMessage);
      throw new Error(
        serverMessage || '체험 상세 조회 중 오류가 발생했습니다.',
      );
    }
    console.error('네트워크 오류:', error);
    throw new Error('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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
      const status = error.response?.status;
      const message = error.response?.data?.message;
      if (status === 400 || status === 404) {
        console.error('체험 리뷰 조회 실패:', message);
        throw new Error(
          message || '리뷰 정보를 불러오는 중 문제가 발생했습니다.',
        );
      }
      console.error('체험 리뷰 조회 실패:', message);
      throw new Error(message || '체험 리뷰 조회 중 오류가 발생했습니다.');
    }
    console.error('네트워크 오류:', error);
    throw new Error('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

//체험 예약 가능일 조회
// 예약가능 월 은 두자리여야 해서 두자리를 입력받을 수 있게했습니다. ex) 1월 -> 01
export const getAvailableSchedule = async ({
  activityId,
  query,
}: {
  activityId: number;
  query: GetAvailableSchduleParams;
}): Promise<AvailableSchedule[]> => {
  try {
    const formattedQuery = {
      ...query,
      month: query.month.padStart(2, '0'),
    };

    const response = await fetcher.get(
      `/activities/${activityId}/available-schedule`,
      {
        params: formattedQuery,
      },
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      if (status === 400) {
        console.error('예약 가능일 조회 실패:', message);
        throw new Error('연도는 YYYY, 월은 MM 형식으로 작성해주세요.');
      }
      if (status === 404) {
        console.error('예약 가능일 조회 실패:', message);
        throw new Error('해당 체험은 존재하지 않습니다.');
      }
      console.error('예약 가능일 조회 실패:', message);
      throw new Error(
        message || '체험 예약 가능일 조회 중 오류가 발생했습니다.',
      );
    }
    console.error('네트워크 오류:', error);
    throw new Error('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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
      const status = error.response?.status;
      const message = error.response?.data?.message;

      console.error('체험 등록 실패:', {
        status,
        message,
        error,
      });

      if (status === 400) {
        throw new Error(message || '입력값을 다시 확인해주세요.');
      }
      if (status === 401) {
        throw new Error('체험 등록은 로그인이 필요합니다.');
      }
      if (status === 409) {
        throw new Error(message || '이미 같은 시간대의 체험이 존재합니다.');
      }
      throw new Error(message || '체험 등록 중 오류가 발생했습니다.');
    }
    console.error('네트워크 오류:', error);
    throw new Error('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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
      const status = error.response?.status;
      const message = error.response?.data?.message;

      console.error('체험 예약 신청 실패:', {
        status,
        message,
        error,
      });

      if (status === 400) {
        throw new Error(message || '입력값을 다시 확인해주세요.');
      }
      if (status === 401) {
        throw new Error('로그인이 필요한 서비스입니다.');
      }
      if (status === 404) {
        throw new Error('존재하지 않는 체험입니다.');
      }
      if (status === 409) {
        throw new Error(
          message ||
            '이미 확정된 예약이 있는 시간대입니다. 다른 시간을 선택해주세요.',
        );
      }
      throw new Error(
        message || '체험 예약 신청 중 알 수 없는 오류가 발생했습니다.',
      );
    }
    console.error('네트워크 오류입니다:', error);
    throw new Error('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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
    if (isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      console.error('이미지 업로드 실패:', {
        status,
        message,
      });
      if (status === 401) {
        throw new Error('로그인이 필요한 기능입니다.');
      }
      throw new Error(message || '이미지 업로드에 실패했습니다.');
    }
    console.error('네트워크 오류:', error);
    throw new Error('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};
