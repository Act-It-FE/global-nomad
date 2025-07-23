import axios from 'axios';

import { MyReserves, Reservation } from '@/types/api/ReserveType';

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
  const params: Record<string, string | number | boolean> = {};

  if (cursorId !== undefined) {
    params.cursor = cursorId;
  }
  if (size !== undefined) {
    if (size < 1) {
      throw new Error('size는 1 이상의 정수여야 합니다.');
    }
    params.size = size;
  }
  if (status !== undefined) {
    if (!isReservationStatus(status)) {
      throw new Error(
        'status는 pending, confirmed, completed, declined, cancelled 중 하나로 입력해주세요.',
      );
    }

    params.status = status;
  }

  try {
    const response = await api.get('/my-reservations', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('unauthorized');
      }
    }
    console.error('예약 정보 조회 실패:', error);
    throw new Error('예약 정보를 가져오는 데 실패했습니다');
  }
};

export const patchReservationStatus = async (
  reservationId: number,
  reservationUserId?: number,
  currentStatus?: string,
  currentUserId?: number,
): Promise<Reservation> => {
  if (currentUserId !== reservationUserId) {
    throw new Error('본인의 예약만 취소할 수 있습니다.');
  }

  if (currentStatus !== 'pending') {
    throw new Error('예약 취소는 예약 신청 상태에서만 가능합니다.');
  }
  try {
    const response = await api.patch(`/my-reservations/${reservationId}`, {
      status: 'canceled',
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('unauthorized');
      }
    }
    console.error('예약 취소 실패:', error);
    throw new Error('예약을 취소하는 것을 실패했습니다');
  }
};
