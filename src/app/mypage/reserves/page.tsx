'use client';
import { useCallback, useEffect, useRef } from 'react';

import useMyReservationsQuery from '@/hooks/reservations/useMyReservationsQuery';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import getErrorMessage from '@/utils/getErrorMessage';

import CancelReservationButton from './_components/CancelReservationButton';
import { ReservesBottom } from './_components/ReservesBottom';
import ReservesCard from './_components/ReservesCard';
import ReservesHeader from './_components/ReservesHeader';
import ReviewReservationButton from './_components/ReviewReservationButton';

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
  const isPC = useMediaQuery('pc');
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
              className='mb-24 flex flex-col max-lg:mb-30 max-lg:gap-12'
            >
              {!isPC && (
                <div className='txt-16_B mt-20'>{reservation.date}</div>
              )}
              <ReservesCard reservesInfo={reservation}>
                <ReservesCard.Content>
                  <ReservesHeader
                    reservesHeaderInfo={{
                      status: reservation.status,
                      title: reservation.activity?.title || '',
                      date: reservation.date,
                      startTime: reservation.startTime,
                      endTime: reservation.endTime,
                    }}
                  />
                  <ReservesBottom reservesInfo={{ ...reservation }} />
                </ReservesCard.Content>
                <ReservesCard.Thumbnail />
              </ReservesCard>
              {!isPC && (
                <>
                  {reservation.status === 'pending' && (
                    <CancelReservationButton reservationId={reservation.id} />
                  )}
                  {reservation.status === 'completed' &&
                    !reservation.reviewSubmitted && (
                      <ReviewReservationButton
                        date={reservation.date}
                        endTime={reservation.endTime}
                        headCount={reservation.headCount}
                        isReviewSubmitted={reservation.reviewSubmitted}
                        reservationId={reservation.id}
                        startTime={reservation.startTime}
                        status={reservation.status}
                        title={reservation.activity?.title}
                      />
                    )}
                </>
              )}
            </div>
          );
        }),
      )}

      {isFetchingNextPage && <div>다음 페이지 로딩 중...</div>}
      {!hasNextPage && <div>모든 예약을 불러왔습니다.</div>}
    </div>
  );
}
