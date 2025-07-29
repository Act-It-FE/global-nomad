'use client';

import { useMyActQuery } from '@/hooks/reserve-status/useMyActivitiesQuery';

import { CalendarGrid } from './_components/calendar/CalendarGrid'; // 추가
import { CalendarHeader } from './_components/calendar/CalendarHeader';

export default function Page() {
  const { data } = useMyActQuery();

  if (!data) return null;

  return (
    <div className='flex w-full flex-col'>
      <h1 className='text-2xl font-bold'>CalendarGrid 테스트</h1>

      {/* CalendarHeader */}
      <div className='border p-4'>
        <h2 className='mb-2 font-semibold'>CalendarHeader</h2>
        <CalendarHeader />
      </div>

      {/* CalendarGrid */}
      <div className='border'>
        <CalendarGrid />
      </div>
    </div>
  );
}
