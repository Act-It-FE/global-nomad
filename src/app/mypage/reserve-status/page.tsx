'use client';

import { useMyActQuery } from '@/hooks/reserve-status/useMyActivitiesQuery';
import { useCalendar } from '@/utils/calendar';

import { CalendarHeader } from './_components/calendar/CalendarHeader';

export default function Page() {
  const { data } = useMyActQuery();

  const { calendarDates, currentDate, goToPreviousMonth, goToNextMonth } =
    useCalendar({
      currentDate: new Date(),
      events: [],
      onDateSelect: (date) => {
        console.warn('선택된 날짜:', date);
      },
    });

  console.log(calendarDates);
  if (!data) return null;

  return (
    <div className='flex w-full flex-col gap-4 p-4'>
      <h1 className='text-2xl font-bold'>CalendarHeader 테스트</h1>

      {/* CalendarHeader만 표시 */}
      <div className='border p-4'>
        <h2 className='mb-2 font-semibold'>CalendarHeader</h2>
        <CalendarHeader
          currentMonth={currentDate}
          goToNextMonth={goToNextMonth}
          goToPreviousMonth={goToPreviousMonth}
        />
      </div>
    </div>
  );
}
