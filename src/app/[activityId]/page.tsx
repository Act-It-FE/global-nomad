'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import activitiesDetailApi from '@/api/activitiesApi';
import getErrorMessage from '@/utils/getErrorMessage';

import ActivityReviews from './_components/ActivityReviews';
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
      } catch (err) {
        const message = getErrorMessage(
          err,
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
        체험 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className='w-full px-30 max-md:px-24'>
      <LoadKakaoMap address={address} />
      <ActivityReviews activityId={Number(activityId)} />
    </div>
  );
}
