import { fetcher } from '@/libs/api';

import {
  GetReservationsParams,
  MyReservation,
  MyReservationsResponse,
  PatchReservationStatusBody,
  PostReviewBody,
} from './types/reservations';

export const reservationsApi = {
  getMyReservations: (params?: GetReservationsParams) => {
    return fetcher.get<MyReservationsResponse>('/my-reservations', {
      params,
    });
  },

  patchReservationStatus: (
    reservationId: number,
    data: PatchReservationStatusBody,
  ) => {
    return fetcher.patch<PatchReservationStatusBody, MyReservation>(
      `/my-reservations/${reservationId}`,
      data,
    );
  },
  postReservationReview: (reservationId: number, data: PostReviewBody) => {
    return fetcher.post<PostReviewBody, MyReservation>(
      `/my-reservations/${reservationId}/reviews`,
      data,
    );
  },
};
