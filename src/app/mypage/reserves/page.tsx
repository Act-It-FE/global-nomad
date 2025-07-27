'use client';
import { useCallback, useRef } from 'react';

import useMyReservationsQuery from '@/hooks/reservations/useMyReservationsQuery';

export default function Page() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useMyReservationsQuery({ size: 2 });

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

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러: {error?.message}</div>;

  return (
    <div className='p-32'>
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
              className='mb-8 border p-100'
            >
              <h3>예약 ID: {reservation.activity?.title}</h3>
              <p>상태: {reservation.status}</p>
              {/* 다른 예약 정보들 */}
            </div>
          );
        }),
      )}

      {isFetchingNextPage && <div>다음 페이지 로딩 중...</div>}
      {!hasNextPage && <div>모든 예약을 불러왔습니다.</div>}
    </div>
  );
}
