// refactoring 필요
// ReservationResponse, ReservationWithActivityResponse 에 사용
export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

// refactoring 필요
// 공통 사용
export interface ErrorResponse {
  message: string;
}
