export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

export interface MyReserves {
  cursorId: number | null;
  totalCount: number;
  reservations: MyReservation[];
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
  date?: string; // yyyy-mm-dd
  startTime?: string; // hh:mm
  endTime?: string; // hh:mm
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  deletedAt?: string | null; // ISO 8601
  activity?: Activity;
  rating?: number;
  content?: string;
}

export interface Activity {
  bannerImageUrl: string | null;
  title: string;
  id: number;
}
