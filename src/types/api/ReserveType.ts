export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'cancelled'
  | 'completed';

export interface MyReserves {
  cursorId: number | null;
  totalCount: number;
  reservations: Reservation[];
}

export interface Reservation {
  id: number;
  teamId: number;
  userId: number;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string; // yyyy-mm-dd
  startTime: string; // hh:mm
  endTime: string; // hh:mm
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  activity: Activity;
}

export interface Activity {
  bannerImageUrl: string | null;
  title: string;
  id: number;
}
