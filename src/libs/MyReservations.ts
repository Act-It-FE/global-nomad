import axios from 'axios';

import {
  MyReservation,
  MyReserves,
  ReservationStatus,
} from '@/types/api/ReserveType';

import api from './textAxios';
const reservationStatusList = [
  'pending',
  'confirmed',
  'declined',
  'canceled',
  'completed',
] as const;

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
  const params: Record<string, string | number> = {};

  if (cursorId !== undefined) {
    params.cursor = cursorId;
  }
  if (size !== undefined) {
    if (!Number.isInteger(size) || size < 1) {
      throw new Error('size는 1 이상의 정수여야 합니다.');
    }
    params.size = size;
  }
  if (status !== undefined) {
    if (!isReservationStatus(status)) {
      throw new Error(
        'status는 pending, confirmed, completed, declined, canceled 중 하나로 입력해주세요.',
      );
    }

    params.status = status;
  }

  try {
    const response = await api.get('/my-reservations', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.message ?? '예약 정보를 가져오는 데 실패했습니다';
      throw new Error(message);
    }
    throw new Error('예약 정보를 가져오는 데 실패했습니다');
  }
};

export const patchReservationStatus = async (
  reservationId: number,
  reservationUserId: number,
  currentStatus: string,
  currentUserId: number,
): Promise<MyReservation> => {
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
      const message =
        error.response?.data.message ?? '예약을 취소하는 것을 실패했습니다';
      throw new Error(message);
    }

    throw new Error('예약을 취소하는 것을 실패했습니다');
  }
};

export interface ReviewBody {
  rating: number;
  content: string;
}

export const postReservationReview = async (
  reservationId: number,
  body: ReviewBody,
): Promise<MyReservation> => {
  // rating 유효성 검사
  const { rating, content } = body;
  const isInteger = Number.isInteger(rating);
  const inRange = rating >= 1 && rating <= 5;

  if (!isInteger || !inRange) {
    throw new Error('rating은 1~5 사이 정수로 입력해주세요.');
  }

  if (typeof content !== 'string') {
    throw new Error('content는 문자열로 입력해주세요.');
  }

  try {
    const response = await api.post(
      `/my-reservations/${reservationId}/reviews`,
      { body },
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.message ?? '리뷰 작성을 실패 했습니다';
      throw new Error(message);
    }

    throw new Error('리뷰 작성을 실패 했습니다');
  }
};
