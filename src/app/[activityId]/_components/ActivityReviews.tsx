'use client';

import { useEffect, useState } from 'react';

import activitiesDetailApi from '@/api/activitiesApi';
import { Review } from '@/api/types/Activities';

type Props = {
  activityId: number;
};

// 평점 평균에 따른 텍스트 만족도 추가
function getRatingText(rating: number) {
  if (rating >= 0 && rating <= 1) return '매우 아쉬움';
  if (rating > 1 && rating <= 2) return '아쉬움';
  if (rating > 2 && rating <= 3) return '보통';
  if (rating > 3 && rating <= 4) return '만족';
  if (rating > 4 && rating <= 5) return '매우 만족';
  return '평점 정보 없음';
}

export default function ActivityReviews({ activityId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { reviews, totalCount, averageRating } =
          await activitiesDetailApi.getReviews(activityId);

        setReviews(reviews);
        setTotalCount(totalCount);
        setAverageRating(averageRating);
      } catch (error) {
        console.error('리뷰를 불러오는데 실패했습니다.', error);
      }
    }

    fetchReviews();
  }, [activityId]);

  return (
    <div className='mt-40'>
      <div className='txt-16_B sm:txt-18_B flex flex-row gap-10 leading-19 sm:leading-21'>
        체험 후기
        <span className='sm:txt-16_B txt_14_M leading-20 font-semibold text-gray-500 sm:leading-20'>
          {totalCount}개
        </span>
      </div>
      <section className='flex flex-col items-center justify-center'>
        <p className='txt-24_M sm:txt-32_B font-semibold'>{averageRating}</p>
        <p className='txt-14_B sm:txt-16_B leading-24 sm:leading-19'>
          {getRatingText(averageRating)}
        </p>
        <div className='txt-14_M leading-24 text-gray-500'>
          {totalCount}개 후기
        </div>
      </section>
      <section className='mt-20 flex flex-col gap-16'>
        {reviews.length === 0 ? (
          <p className='txt-14_M text-gray-500'>아직 후기가 없습니다.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id}>
              <div>{review.user.nickname}</div>
              <div>{review.createdAt}</div>
              <div>{review.content}</div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
