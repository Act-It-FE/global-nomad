'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import activitiesApi from '@/api/activitiesApi';
import myActivitiesApi from '@/api/myActivities';
import {
  ActivitiesDetail,
  ActivityReviewResponse,
} from '@/api/types/activities';
import DropDown from '@/components/DropDown';
import Icon from '@/components/Icon';
import { WarningContent } from '@/components/Modal/contents/WarningContent';

interface Props {
  activityId: number;
}

export default function ActivitySummary({ activityId }: Props) {
  const router = useRouter();

  const [data, setData] = useState<ActivitiesDetail | null>(null);
  const [review, setReview] = useState<ActivityReviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMyActivity, setIsMyActivity] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activity, reviewData] = await Promise.all([
          activitiesApi.getDetail(activityId),
          activitiesApi.getReviews(activityId),
        ]);
        setData(activity);
        setReview(reviewData);

        const storedUserId = localStorage.getItem('userId');
        if (storedUserId && activity.userId === Number(storedUserId)) {
          setIsMyActivity(true);
        }
      } catch (error) {
        console.error('데이터 요청 중 오류 발생:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activityId]);

  const handleDelete = async () => {
    try {
      await myActivitiesApi.delete(activityId);
      router.push('/');
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  if (loading)
    return (
      <div className='border-primary-500 size-50 animate-spin rounded-full border-2 border-t-transparent' />
    );

  if (error || !data || !review) return <p>오류가 발생했어요.</p>;

  const { title, address, category } = data;
  const { averageRating, totalCount } = review;

  return (
    <section className='relative my-20 flex flex-col gap-6 md:my-40'>
      {isMyActivity && (
        <div className='absolute top-0 right-0'>
          <DropDown
            items={[
              {
                text: '수정하기',
                onClick: () => router.push(`/mypage/activities/${activityId}`),
              },
              {
                text: '삭제하기',
                danger: true,
                onClick: () => setIsModalOpen(true),
              },
            ]}
            position='left'
            trigger={
              <button>
                <Icon className='h-28 w-28 cursor-pointer' icon='More' />
              </button>
            }
          />
        </div>
      )}

      <div className='md:txt-14_M txt-13_M leading-17 text-gray-950 opacity-75'>
        {category}
      </div>

      <p className='md:txt-24_B txt-18_B leading-21 text-gray-950 md:leading-29'>
        {title}
      </p>

      <div className='txt-14_M leading-17 text-gray-700'>
        <div className='mt-4 flex flex-row items-center gap-4'>
          <Icon className='fill-yellow-400' icon='Star' />
          <span className='my-5'>
            {averageRating.toFixed(1)} ({totalCount})
          </span>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <Icon className='fill-black' icon='Map' />
          <p>{address}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <WarningContent
            message='체험을 삭제하시겠습니까?'
            variant='warning'
            onCancel={() => setIsModalOpen(false)}
            onConfirm={handleDelete}
          />
        </div>
      )}
    </section>
  );
}
