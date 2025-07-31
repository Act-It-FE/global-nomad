'use client';

import Image from 'next/image';
import Link from 'next/link';

import empty_image from '@/../public/images/empty-image.png';
import {
  BUTTON_SIZE,
  BUTTON_TEXT_SIZE,
  BUTTON_VARIANTS,
} from '@/constants/ButtonStyles';
import { useMyActQuery } from '@/hooks/myActivities/useMyActivitiesQuery';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { cn } from '@/utils/cn';

import MyExperience from './_components/MyExperience';

export default function Page() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyActQuery();
  const lastElement = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
  const activitiesSet = data?.pages.map((res) => res.activities);
  const activities = activitiesSet
    ? activitiesSet[0].concat(...(activitiesSet.slice(1) || []))
    : [];

  return (
    <>
      <div className='flex w-full flex-col gap-30'>
        <header className='flex items-center justify-between gap-12'>
          <div className='flex flex-col gap-10 py-10'>
            <div className='txt-18_B leading-21 text-gray-950'>
              내 체험 관리
            </div>
            <div className='txt-14_M leading-17 text-gray-500'>
              체험을 등록하거나 수정 및 삭제가 가능합니다.
            </div>
          </div>
          <Link
            className={cn(
              BUTTON_VARIANTS['primary'],
              BUTTON_SIZE['md'],
              BUTTON_TEXT_SIZE('primary', 'md'),
              'content-center rounded-[14px] text-center',
            )}
            href='/mypage/add-activity'
          >
            체험 등록하기
          </Link>
        </header>
        {!isLoading &&
          (activities?.length ? (
            <>
              {activities.map((act) => (
                <MyExperience key={act.id} data={act} />
              ))}
            </>
          ) : (
            <div className='justify-items-center'>
              <Image
                alt='empty'
                className='m-30'
                height={122}
                src={empty_image}
                width={122}
              />
              <div className='txt-18_M leading-21 text-gray-600'>
                아직 등록한 체험이 없어요
              </div>
            </div>
          ))}
        {(isLoading || isFetchingNextPage) && (
          <div className='border-primary-500 m-auto size-50 animate-spin rounded-full border-2 border-t-transparent' />
        )}
      </div>
      <div ref={lastElement} />
    </>
  );
}
