'use client';

import { useEffect, useState } from 'react';

import activitiesDetailApi from '@/api/activitiesApi';
import { Review } from '@/api/types/activities';

interface UseActivityReviewsProps {
  activityId: number;
  size?: number;
}

export default function useActivityReviews({
  activityId,
  size = 3,
}: UseActivityReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const { reviews, totalCount, averageRating } =
          await activitiesDetailApi.getReviews(activityId, { page, size });

        setReviews(reviews);
        setTotalCount(totalCount);
        setAverageRating(averageRating);
      } catch (error) {
        console.error('리뷰를 불러오는데 실패했습니다.', error);
        setErrorMessage('후기를 불러오는데 문제가 발생했어요.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, [activityId, page, size]);

  return {
    reviews,
    totalCount,
    averageRating,
    errorMessage,
    isLoading,
    page,
    setPage,
    size,
  };
}
