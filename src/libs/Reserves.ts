import { MyReserves } from '@/types/api/ReserveType';

import api from './textAxios';

const reservationStatusList = [
  'pending',
  'confirmed',
  'declined',
  'cancelled',
  'completed',
] as const;

type ReservationStatus = (typeof reservationStatusList)[number];

function isReservationStatus(value: unknown): value is ReservationStatus {
  return (
    typeof value === 'string' &&
    reservationStatusList.includes(value as ReservationStatus)
  );
}

export const getMyReservations = async (
  cursorId?: number,
  size?: number,
  status?: string,
): Promise<MyReserves> => {
  if (status !== undefined && !isReservationStatus(status)) {
    throw new Error(
      'status는 pending, confirmed, completed, declined, cancelled 중 하나로 입력해주세요.',
    );
  }

  if (size !== undefined && size < 1) {
    throw new Error('size는 1 이상의 정수여야 합니다.');
  }

  const params: Record<string, string | number | boolean> = {};

  if (cursorId !== undefined) {
    params.cursor = cursorId;
  }
  if (size !== undefined) {
    params.size = size;
  }
  if (status !== undefined) {
    params.status = status;
  }

  try {
    const response = await api.get('/my-reservations', { params });
    return response.data;
  } catch (error) {
    console.error('예약 정보 조회 실패:', error);
    throw new Error('예약 정보를 가져오는 데 실패했습니다');
  }
};
