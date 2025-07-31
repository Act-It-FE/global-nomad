'use client';

import { useState } from 'react';

import { ReservationStatus } from '@/api/types/reservations';
import useMyReservationsQuery from '@/hooks/reservations/useMyReservationsQuery';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import getErrorMessage from '@/utils/getErrorMessage';

import CancelReservationButton from './_components/CancelReservationButton';
import { ReservesBottom } from './_components/ReservesBottom';
import ReservesCard from './_components/ReservesCard';
import ReservesFilter from './_components/ReservesFilter';
import ReservesHeader from './_components/ReservesHeader';
import ReviewReservationButton from './_components/ReviewReservationButton';

export default function Page() {
  const [selectedStatus, setSelectedStatus] =
    useState<ReservationStatus | null>(null);

  const queryParams = selectedStatus ? { status: selectedStatus } : {};
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useMyReservationsQuery(queryParams);
  const errorMessage = getErrorMessage(error, '예약 내역 조회에 실패했습니다');
  const isPC = useMediaQuery('pc');

  const lastElement = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  // 필터링된 데이터
  const filteredData = data?.pages
    .map((page) => ({
      ...page,
      reservations: page.reservations,
    }))
    .filter((page) => page.reservations && page.reservations.length > 0);

  if (isLoading) {
    return (
      <div className='flex w-full items-center justify-center py-100'>
        <div className='border-primary-500 size-50 animate-spin rounded-full border-2 border-t-transparent' />
      </div>
    );
  }
  if (isError) {
    return <div>에러:{errorMessage}</div>;
  }

  return (
    <div className='flex w-full flex-col gap-30 max-md:gap-13'>
      <ReservesFilter
        isEmpty={filteredData?.length === 0}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <div>
        {filteredData?.map((page, pageIndex) =>
          page.reservations?.map((reservation, itemIndex) => {
            const isLastElement =
              pageIndex === filteredData.length - 1 &&
              itemIndex === page.reservations.length - 1;

            return (
              <div
                key={reservation.id}
                ref={isLastElement ? lastElement : undefined}
                className='mb-30 flex flex-col border-gray-50 max-lg:gap-12 lg:mb-24 [&:not(:first-child)]:border-t'
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
                    <ReservesBottom reservesInfo={reservation} />
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
      </div>
    </div>
  );
}
