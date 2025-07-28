import { ReservationStatus } from '@/api/types/reservations';

export const RESERVATION_STATUS_OPTIONS: Array<{
  value: ReservationStatus;
  label: string;
}> = [
  { value: 'pending', label: '예약 완료' },
  { value: 'canceled', label: '예약 취소' },
  { value: 'confirmed', label: '예약 승인' },
  { value: 'declined', label: '예약 거절' },
  { value: 'completed', label: '체험 완료' },
];
