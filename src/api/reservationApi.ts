import apiClient from '@/libs/apiClient';

import {
  GetReservationsParams,
  MyReservation,
  MyReservationsResponse,
  PatchReservationStatusBody,
  PostReviewBody,
} from './types/reservations';

const reservationsApi = {
  getMyReservations: (params?: GetReservationsParams) => {
    return apiClient.get<MyReservationsResponse>('/my-reservations', {
      params,
    });
  },

  patchReservationStatus: (
    reservationId: number,
    data: PatchReservationStatusBody,
  ) => {
    return apiClient.patch<PatchReservationStatusBody, MyReservation>(
      `/my-reservations/${reservationId}`,
      data,
    );
  },
  postReservationReview: (reservationId: number, data: PostReviewBody) => {
    return apiClient.post<PostReviewBody, MyReservation>(
      `/my-reservations/${reservationId}/reviews`,
      data,
    );
  },
};

export default reservationsApi;
