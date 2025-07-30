'use client';

import { useEffect, useState } from 'react';

import activitiesApi from '@/api/activitiesApi';
import { ActivitiesDetail } from '@/api/types/activities';
import Icon from '@/components/Icon';

interface Props {
  activityId: number;
}

export default function ActivitySummary({ activityId }: Props) {
  const [data, setData] = useState<ActivitiesDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activity = await activitiesApi.getDetail(activityId);
        setData(activity);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [activityId]);

  if (loading)
    return (
      <div className='border-primary-500 size-50 animate-spin rounded-full border-2 border-t-transparent' />
    );
  if (error || !data) return <p>오류가 발생했어요.</p>;

  const { title, address, category } = data;

  return (
    <section className='flex flex-col gap-6'>
      <div className='txt-14_M leading-17 text-gray-950 opacity-75'>
        {category}
      </div>
      <p className='txt-24_B leading-29 text-gray-950'>{title}</p>
      <div className='txt-14_M leading-17 text-gray-700'>
        <div className='mt-4 flex flex-row items-center gap-4'>
          <Icon className='fill-yellow-400' icon='Star' />
          <span className='my-5'>평균평점 토탈카운트</span>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <Icon className='fill-black' icon='Map' />
          <p>{address}</p>
        </div>
      </div>
    </section>
  );
}
