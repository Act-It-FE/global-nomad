import activitiesDetailApi from '@/libs/activitiesDetail';

import LoadKakaoMap from './_components/LoadKakaoMap';

interface Props {
  params: { activityId: string };
}

export default async function ActivityDetail(props: Props) {
  const activityId = Number(props.params.activityId);

  const activity = await activitiesDetailApi.getDetail(activityId);
  const address = activity.address;

  return <LoadKakaoMap address={address} />;
}
