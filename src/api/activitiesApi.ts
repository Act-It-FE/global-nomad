import {
  ActivitiesDetail,
  ActivityImageUploadResponse,
  ActivityRegisterPayload,
  ActivityRegisterResponse,
  ActivityResponse,
  ActivityReviewResponse,
  AvailableSchedule,
  GetActivitiesParams,
  GetActivityReviewsParams,
  GetAvailableSchduleParams,
  ReservationRequest,
  ReservationResponse,
} from '@/api/types/activities';
import apiClient from '@/libs/apiClient';

const activitiesDetailApi = {
  /** 체험 리스트 조회 */
  get: (query?: GetActivitiesParams) => {
    return apiClient.get<ActivityResponse>(`/activities`, {
      params: query,
    });
  },

  /** 체험 상세 조회 */
  getDetail: (activityId: number) => {
    return apiClient.get<ActivitiesDetail>(`/activities/${activityId}`);
  },

  /** 체험 리뷰 조회 */
  getReviews: (activityId: number, query?: GetActivityReviewsParams) => {
    return apiClient.get<ActivityReviewResponse>(
      `/activities/${activityId}/reviews`,
      {
        params: query,
      },
    );
  },

  /** 체험 예약 가능일 조회 */
  getAvailableSchedule: (
    activityId: number,
    query: GetAvailableSchduleParams,
  ) => {
    return apiClient.get<AvailableSchedule[]>(
      `/activities/${activityId}/available-schedule`,
      {
        params: query,
      },
    );
  },

  /** 체험 등록 */
  post: (
    payload: ActivityRegisterPayload,
  ): Promise<ActivityRegisterResponse> => {
    return apiClient.post<ActivityRegisterPayload, ActivityRegisterResponse>(
      `/activities`,
      payload,
    );
  },

  /** 체험 예약 신청 */
  postReservation: (activityId: number, payload: ReservationRequest) => {
    return apiClient.post<ReservationRequest, ReservationResponse>(
      `/activities/${activityId}/reservations`,
      payload,
    );
  },

  /** 체험 이미지 업로드 */
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    return apiClient.post<FormData, ActivityImageUploadResponse>(
      `/activities/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  },
};

export default activitiesDetailApi;
