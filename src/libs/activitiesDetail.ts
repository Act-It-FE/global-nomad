import axios from 'axios';

import { ActivitiesDetail } from '@/types/apis/Activities';

export const getActivityDetail = async (
  teamId: string,
  activityId: number,
): Promise<ActivitiesDetail> => {
  const response = await axios.get(
    `https://sp-globalnomad-api.vercel.app/${teamId}/activities/${activityId}`,
  );
  return response.data;
};
