'use client';

import { useEffect } from 'react';

import {
  useMyActQuery,
  useMyActReservationDashboard,
} from '@/hooks/myActivities/useMyActivitiesQuery';
import { useCalendarStore } from '@/stores/calendarStore';
import { formatDateForAPI } from '@/utils/dateUtils';

import { Calendar } from './_components/calendar/Calendar';
import { MyActListDropDown } from './_components/MyActListDropDown';

export default function Page() {
  const { data } = useMyActQuery();
  const { selectedActivityId, currentDate, setReservations } =
    useCalendarStore();

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

  if (!data) return null;

  if (!selectedActivityId) {
    return (
      <div className='flex w-full flex-col gap-30 max-md:gap-18 md:max-lg:gap-24'>
        <div className='flex flex-col items-start justify-center gap-10 py-10 leading-[normal]'>
          <span className='txt-18_B tracking-[-0.45px] text-gray-950'>
            예약 현황
          </span>
          <span className='txt-14_M tracking-[-0.35px] text-gray-500'>
            내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
          </span>
        </div>
        <MyActListDropDown activities={data.activities} />
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col gap-30 max-md:gap-18 md:max-lg:gap-24'>
      <div className='flex flex-col items-start justify-center gap-10 py-10 leading-[normal]'>
        <span className='txt-18_B tracking-[-0.45px] text-gray-950'>
          예약 현황
        </span>
        <span className='txt-14_M tracking-[-0.35px] text-gray-500'>
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </span>
      </div>
      <MyActListDropDown activities={data.activities} />
      <Calendar />
    </div>
  );
}
