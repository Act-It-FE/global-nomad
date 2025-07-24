import axios from 'axios';

import { ActivitiesDetail } from '@/types/apis/Activities';

// 체험상세 페이지 get 하는 함수
export const getActivityDetail = async (
  teamId: string,
  activityId: number,
): Promise<ActivitiesDetail> => {
  const response = await axios.get(
    `https://sp-globalnomad-api.vercel.app/${teamId}/activities/${activityId}`,
  );
  return response.data;
};
