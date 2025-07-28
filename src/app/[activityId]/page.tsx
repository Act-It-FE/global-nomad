import activitiesDetailApi from '@/libs/activitiesDetail';
import getErrorMessage from '@/utils/getErrorMessage';

import LoadKakaoMap from './_components/LoadKakaoMap';

interface Props {
  params: { activityId: string };
}

export default async function ActivityDetail(props: Props) {
  const activityId = Number(props.params.activityId);

  try {
    const activity = await activitiesDetailApi.getDetail(activityId);
    const address = activity.address;

    return (
      <div className='w-full px-30 sm:px-24'>
        <LoadKakaoMap address={address} />
      </div>
    );
  } catch (error) {
    const message = getErrorMessage(error, '체험 정보를 불러오지 못했습니다.');
    console.error('실패:', message);

    return (
      <div className='flex h-200 items-center justify-center text-red-500'>
        {message}
      </div>
    );
  }
}
