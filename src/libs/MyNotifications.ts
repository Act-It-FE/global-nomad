import axios from 'axios';

import { MyNotify } from '@/types/api/NotificationType';

import { fetcher } from './api';

export interface GetMyNotifications {
  cursorId?: number;
  size?: number;
}

export const getMyNotifications = async (
  query?: GetMyNotifications,
): Promise<MyNotify> => {
  const params: Record<string, number> = {};
  const { cursorId, size } = query || {};

  if (cursorId !== undefined) {
    params.cursor = cursorId;
  }
  if (size !== undefined) {
    params.size = size;
  }

  try {
    const response = await fetcher.get('/my-notifications', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.message ?? '알림 정보를 가져오는 데 실패했습니다';
      throw new Error(message);
    }
    throw new Error('알림 정보를 가져오는 데 실패했습니다');
  }
};

export const deleteNotification = async (
  notificationId: number,
): Promise<void> => {
  try {
    await fetcher.delete(`/my-notifications/${notificationId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.message ?? '알림 삭제에 실패했습니다';
      throw new Error(message);
    }
    throw new Error('알림 삭제에 실패했습니다');
  }
};
