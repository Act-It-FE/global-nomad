import axios from 'axios';

import { ActivitiesDetail } from '@/types/apis/Activities';

export const getActivityDetail = async (
  teamId: string,
  activityId: number,
): Promise<ActivitiesDetail> => {
  try {
    const response = await axios.get(
      `https://sp-globalnomad-api.vercel.app/${teamId}/activities/${activityId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 404) {
        console.error('요청하신 체험 정보를 찾을 수 없습니다.');
        throw new Error('요청하신 체험 정보를 찾을 수 없습니다.');
      }

      console.error('알 수 없는 오류가 발생했습니다.');
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }

    console.error('네트워크 에러 발생:', error);
    throw new Error('네트워크 에러가 발생했습니다.');
  }
};
