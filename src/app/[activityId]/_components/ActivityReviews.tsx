'use client';

import Icon from '@/components/Icon';
import Pagination from '@/components/Pagination';
import useActivityReviews from '@/hooks/activity-details/useActivityReviews';

import ReviewCard from './ReviewCard';

type Props = {
  activityId: number;
};

export default function ActivityReviews({ activityId }: Props) {
  const {
    reviews,
    totalCount,
    averageRating,
    errorMessage,
    isLoading,
    page,
    setPage,
    size,
  } = useActivityReviews({ activityId });

  const getRatingText = (rating: number) => {
    if (rating >= 0 && rating <= 1) return '매우 불만족';
    if (rating > 1 && rating <= 2) return '불만족';
    if (rating > 2 && rating <= 3) return '보통';
    if (rating > 3 && rating <= 4) return '만족';
    if (rating > 4 && rating <= 5) return '매우 만족';
    return '평점 정보 없음';
  };

  return (
    <div className='my-40'>
      <div className='txt-16_B md:txt-18_B flex flex-row gap-10 leading-19 md:leading-21'>
        체험 후기
        <span className='md:txt-16_B txt-14_M leading-20 font-semibold text-gray-500 md:leading-20'>
          {totalCount}개
        </span>
      </div>

      <section className='flex flex-col items-center justify-center gap-4'>
        <p className='txt-24_M md:txt-32_B font-semibold'>
          {isNaN(averageRating) ? '0.0' : averageRating.toFixed(1)}
        </p>
        <p className='txt-14_B md:txt-16_B leading-24 md:leading-19'>
          {getRatingText(averageRating)}
        </p>
        <div className='flex flex-row items-center justify-center'>
          <Icon
            className='mr-4 inline-block h-16 w-16 fill-yellow-400'
            icon='Star'
          />
          <span className='txt-14_M text-gray-400'>{totalCount}개 후기</span>
        </div>
      </section>

      {isLoading ? (
        <div className='mt-20 text-center text-gray-400'>
          후기를 불러오는 중입니다...
        </div>
      ) : errorMessage ? (
        <div className='mt-20 text-center text-red-500'>{errorMessage}</div>
      ) : totalCount === 0 ? (
        <div className='mt-20 text-center text-gray-400'>
          아직 등록된 후기가 없습니다.
        </div>
      ) : (
        <>
          <div className='mt-20 flex flex-col gap-16'>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {totalCount > size && (
            <div className='mt-24 flex justify-center'>
              <Pagination
                currentPage={page}
                pageSize={size}
                totalCount={totalCount}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
