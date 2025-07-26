export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

export interface GetReservationsParams {
  cursorId?: number;
  size?: number;
  status?: ReservationStatus;
}

export interface PatchReservationStatusBody {
  status: 'canceled';
}

export interface PostReviewBody {
  rating: number;
  content: string;
}

export interface Activity {
  bannerImageUrl: string | null;
  title: string;
  id: number;
}

export interface MyReservation {
  id: number;
  teamId: string;
  userId: number;
  scheduleId?: number;
  activityId?: number;
  status?: ReservationStatus;
  reviewSubmitted?: boolean;
  totalPrice?: number;
  headCount?: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  activity?: Activity;
  rating?: number;
  content?: string;
}

export interface MyReservationsResponse {
  cursorId: number | null;
  totalCount: number;
  reservations: MyReservation[];
}
