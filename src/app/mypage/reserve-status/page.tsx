'use client';

import { useState } from 'react';

import { useMyActQuery } from '@/hooks/reserve-status/useMyActivitiesQuery';
import { useCalendar } from '@/utils/calendar';
import { formatDateKorean } from '@/utils/dateUtils';

import { CalendarGrid } from './_components/calendar/CalendarGrid'; // 추가
import { CalendarHeader } from './_components/calendar/CalendarHeader';

export default function Page() {
  const { data } = useMyActQuery();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { calendarDates, currentDate, goToPreviousMonth, goToNextMonth } =
    useCalendar({
      currentDate: new Date(),
      events: [],
      onDateSelect: (date) => {
        console.warn('선택된 날짜:', date);
      },
    });

  console.log(calendarDates);
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log('선택된 날짜:', formatDateKorean(date));
  };

  const handleDateDeselect = () => {
    setSelectedDate(null);
  };

  if (!data) return null;

  return (
    <div className='flex w-full flex-col'>
      <h1 className='text-2xl font-bold'>CalendarGrid 테스트</h1>

      {/* CalendarHeader */}
      <div className='border p-4'>
        <h2 className='mb-2 font-semibold'>CalendarHeader</h2>
        <CalendarHeader
          currentMonth={currentDate}
          goToNextMonth={goToNextMonth}
          goToPreviousMonth={goToPreviousMonth}
        />
      </div>

      {/* CalendarGrid */}
      <div className='border'>
        <CalendarGrid
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateDeselect={handleDateDeselect}
          onDateSelect={handleDateSelect}
        />
      </div>

      {/* 선택된 날짜 표시 */}
      <div className='border p-4'>
        <h2 className='mb-2 font-semibold'>
          선택된 날짜: {selectedDate ? formatDateKorean(selectedDate) : ''}
        </h2>
      </div>
    </div>
  );
}
