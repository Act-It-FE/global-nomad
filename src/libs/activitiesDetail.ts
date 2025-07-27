import {
  ActivitiesDetail,
  ActivityImageUploadResponse,
  ActivityRegisterPayload,
  ActivityResponse,
  ActivityReviewResponse,
  AvailableSchedule,
  GetActivitiesParams,
  GetActivityReviewsParams,
  GetAvailableSchduleParams,
  ReservationRequest,
  ReservationResponse,
} from '@/api/types/Activities';
import apiClient from '@/libs/apiClient';

//체험 리스트 조회
export const getActivities = async (
  query?: GetActivitiesParams,
): Promise<ActivityResponse> => {
  return await apiClient.get(`/activities`, {
    params: query,
  });
};

// 체험 상세 조회
export const getActivityDetail = async (
  activityId: number,
): Promise<ActivitiesDetail> => {
  return await apiClient.get(`/activities/${activityId}`);
};

// 체험 리뷰 조회
export const getActivityReviews = async (
  activityId: number,
  query?: GetActivityReviewsParams,
): Promise<ActivityReviewResponse> => {
  return await apiClient.get(`/activities/${activityId}/reviews`, {
    params: query,
  });
};

//체험 예약 가능일 조회
export const getAvailableSchedule = async (
  activityId: number,
  query: GetAvailableSchduleParams,
): Promise<AvailableSchedule[]> => {
  const formattedQuery = {
    ...query,
    month: query.month.length === 1 ? `0${query.month}` : query.month,
  };
  return await apiClient.get(`/activities/${activityId}/available-schedule`, {
    params: formattedQuery,
  });
};

// 체험 등록
export const createActivity = async (
  payload: ActivityRegisterPayload,
): Promise<void> => {
  return await apiClient.post(`/activities`, payload);
};

// 체험 예약 신청
export const postReservation = async (
  activityId: number,
  payload: ReservationRequest,
): Promise<ReservationResponse> => {
  return await apiClient.post(
    `/activities/${activityId}/reservations`,
    payload,
  );
};

//체험 이미지 URL 생성
export const uploadActivityImage = async (
  file: File,
): Promise<ActivityImageUploadResponse> => {
  const formData = new FormData();
  formData.append('image', file);
  return await apiClient.post(`/activities/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
