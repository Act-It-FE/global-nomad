'use client';

import { useEffect } from 'react';

import {
  useMyActQuery,
  useMyActReservationDashboard,
} from '@/hooks/myActivities/useMyActivitiesQuery';
import { useCalendarStore } from '@/stores/calendarStore';
import { formatDateForAPI } from '@/utils/dateUtils';
import getErrorMessage from '@/utils/getErrorMessage';

import { Calendar } from './_components/calendar/Calendar';
import { MyActListDropDown } from './_components/MyActListDropDown';
import { ReservationModal } from './_components/ReservationModal';

export default function Page() {
  const { data, isLoading, isError, error } = useMyActQuery();
  const { selectedActivityId, currentDate, setReservations } =
    useCalendarStore();
  const errorMessage = getErrorMessage(error, '예약 내역 조회에 실패했습니다');

  // 항상 훅을 호출하되, selectedActivityId가 없으면 0을 전달

  const { data: reservationDashboard } = useMyActReservationDashboard(
    selectedActivityId || 0,
    formatDateForAPI(currentDate),
    { enabled: !!selectedActivityId && selectedActivityId > 0 },
  );

  // useEffect는 항상 호출
  useEffect(() => {
    if (reservationDashboard && selectedActivityId) {
      // reservationDashboard는 배열이므로 Record로 변환
      const reservationsRecord: Record<
        string,
        {
          completed: number;
          confirmed: number;
          pending: number;
        }
      > = {};

      reservationDashboard.forEach((item) => {
        reservationsRecord[item.date] = item.reservations;
      });

      setReservations(reservationsRecord);
    }
  }, [reservationDashboard, selectedActivityId, setReservations]);

  if (
    !data ||
    !data.pages[0].activities ||
    data.pages[0].activities.length === 0
  ) {
    return (
      <div className='flex w-full flex-col gap-13 md:gap-30'>
        <ReservationStatusHeader />
        <div className='flex flex-col items-center justify-center leading-[normal]'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt='체험이 없어요'
            className='size-182 p-30'
            src='/images/empty-image.png'
          />
          <div className='txt-18_M mb-30 tracking-[-0.45px] text-gray-600'>
            아직 등록한 체험이 없어요
          </div>
        </div>
      </div>
    );
  }

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

  if (!selectedActivityId) {
    return (
      <div className='flex w-full flex-col gap-30 max-md:gap-18 md:max-lg:gap-24'>
        <ReservationStatusHeader />
        <MyActListDropDown activities={data.pages[0].activities} />
      </div>
    );
  }

  return (
    <div className='relative mb-30 flex w-full flex-col gap-30 max-md:gap-18 md:max-lg:gap-24'>
      <ReservationStatusHeader />
      <MyActListDropDown activities={data.pages[0].activities} />
      <Calendar />
      <ReservationModal />
    </div>
  );
}

function ReservationStatusHeader() {
  return (
    <div className='flex flex-col items-start justify-center gap-10 py-10 leading-[normal]'>
      <span className='txt-18_B tracking-[-0.45px] text-gray-950'>
        예약 현황
      </span>
      <span className='txt-14_M tracking-[-0.35px] text-gray-500'>
        내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
      </span>
    </div>
  );
}
