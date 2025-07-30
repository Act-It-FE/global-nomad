'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import activitiesDetailApi from '@/api/activitiesApi';
import getErrorMessage from '@/utils/getErrorMessage';

import ActivityDescription from './_components/ActivityDescription';
import ActivityReviews from './_components/ActivityReviews';
import ActivitySummary from './_components/ActivitySummary';
import LoadKakaoMap from './_components/LoadKakaoMap';

export default function ActivityDetail() {
  const { activityId } = useParams();
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!activityId) return;

    const id = Number(activityId);
    if (isNaN(id)) {
      setError('잘못된 체험 ID입니다.');
      return;
    }

    const fetchData = async () => {
      try {
        const activity = await activitiesDetailApi.getDetail(id);
        setAddress(activity.address);
      } catch (error) {
        const message = getErrorMessage(
          error,
          '체험 정보를 불러오지 못했습니다.',
        );
        console.error('실패:', message);
        setError(message);
      }
    };

    fetchData();
  }, [activityId]);

  if (error) {
    return (
      <div className='flex h-200 items-center justify-center text-red-500'>
        {error}
      </div>
    );
  }

  if (!address) {
    return (
      <div className='flex h-200 items-center justify-center text-gray-500'>
        <div className='border-primary-500 size-50 animate-spin rounded-full border-2 border-t-transparent' />
      </div>
    );
  }

  return (
    <div className='w-full px-24 md:px-30'>
      <ActivitySummary activityId={Number(activityId)} />
      <ActivityDescription activityId={Number(activityId)} />
      <LoadKakaoMap address={address} />
      <ActivityReviews activityId={Number(activityId)} />
    </div>
  );
}
