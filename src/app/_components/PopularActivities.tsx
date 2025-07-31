'use client';

import Image from 'next/image';

import useActivitiesQuery from '@/hooks/activities/useActivitiesQuery';

import PopularActivitiesCarousel from './PopularActivitiesCarousel';

export default function PopularActivities() {
  const {
    data: { activities = [], totalCount = 0 } = {},
    isLoading,
    isError,
  } = useActivitiesQuery({
    method: 'offset',
    sort: 'most_reviewed',
    size: 8,
  });

  return (
    <div className='flex flex-col gap-14 md:gap-16 lg:gap-20'>
      <div className='md:txt-32_B txt-18_B leading-26 md:leading-38'>
        🔥 인기 체험
      </div>
      {isLoading && (
        <div className='flex items-center justify-center'>
          <div className='border-primary-500 size-50 animate-spin rounded-full border-2 border-t-transparent' />
        </div>
      )}

      {!isLoading && isError && (
        <p className='txt-18_M text-center text-red-500'>
          데이터를 불러오지 못했어요.
        </p>
      )}

      {!isLoading && !isError && totalCount === 0 && (
        <div className='flex flex-col items-center justify-center leading-[normal]'>
          <Image
            alt='체험이 없어요'
            className='p-30'
            height={182}
            src='/images/empty-image.png'
            width={182}
          />
          <div className='txt-18_M mb-30 tracking-[-0.45px] text-gray-600'>
            체험이 존재하지 않아요.
          </div>
        </div>
      )}

      {!isLoading && !isError && totalCount > 0 && (
        <PopularActivitiesCarousel activities={activities} />
      )}
    </div>
  );
}
