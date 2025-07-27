'use client';
import { useCallback, useEffect, useRef } from 'react';

import useMyReservationsQuery from '@/hooks/reservations/useMyReservationsQuery';
import getErrorMessage from '@/utils/getErrorMessage';

import ReservesCard from './_components/ReservesCard';

export default function Page() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useMyReservationsQuery({});
  const errorMessage = getErrorMessage(error, '예약 내역 조회에 실패했습니다');

  // 스크롤 감지
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) {
    return <div>에러:{errorMessage}</div>;
  }
  return (
    <div className='w-full'>
      <h1>예약 목록 테스트</h1>

      {data?.pages.map((page, pageIndex) =>
        page.reservations?.map((reservation, itemIndex) => {
          const isLastElement =
            pageIndex === data.pages.length - 1 &&
            itemIndex === page.reservations.length - 1;

          return (
            <div
              key={reservation.id}
              ref={isLastElement ? lastElementRef : undefined}
              className='mb-24'
            >
              <ReservesCard reservesInfo={reservation}>
                <ReservesCard.Content>
                  <h3>{reservation.activity?.title}</h3>
                </ReservesCard.Content>
                <ReservesCard.Thumbnail />
              </ReservesCard>
            </div>
          );
        }),
      )}

      {isFetchingNextPage && <div>다음 페이지 로딩 중...</div>}
      {!hasNextPage && <div>모든 예약을 불러왔습니다.</div>}
    </div>
  );
}
