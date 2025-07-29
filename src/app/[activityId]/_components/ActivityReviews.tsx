'use client';

import { useEffect, useState } from 'react';

import activitiesDetailApi from '@/api/activitiesApi';
import { Review } from '@/api/types/Activities';
import Icon from '@/components/Icon';
import Pagination from '@/components/Pagination';

import ReviewCard from './ReviewCard';

type Props = {
  activityId: number;
};

export default function ActivityReviews({ activityId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [page, setPage] = useState(1);
  const size = 3;

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { reviews, totalCount, averageRating } =
          await activitiesDetailApi.getReviews(activityId, { page, size });

        setReviews(reviews);
        setTotalCount(totalCount);
        setAverageRating(averageRating);
      } catch (error) {
        console.error('리뷰를 불러오는데 실패했습니다.', error);
      }
    }

    fetchReviews();
  }, [activityId, page]);

  const getRatingText = (rating: number) => {
    if (rating >= 0 && rating <= 1) return '매우 아쉬움';
    if (rating > 1 && rating <= 2) return '아쉬움';
    if (rating > 2 && rating <= 3) return '보통';
    if (rating > 3 && rating <= 4) return '만족';
    if (rating > 4 && rating <= 5) return '매우 만족';
    return '평점 정보 없음';
  };

  return (
    <div className='my-40'>
      <div className='txt-16_B sm:txt-18_B flex flex-row gap-10 leading-19 sm:leading-21'>
        체험 후기
        <span className='sm:txt-16_B txt_14_M leading-20 font-semibold text-gray-500 sm:leading-20'>
          {totalCount}개
        </span>
      </div>

      <section className='flex flex-col items-center justify-center gap-4'>
        <p className='txt-24_M sm:txt-32_B font-semibold'>
          {averageRating.toFixed(1)}
        </p>
        <p className='txt-14_B sm:txt-16_B leading-24 sm:leading-19'>
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
    </div>
  );
}
