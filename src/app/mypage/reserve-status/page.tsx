'use client';

import { useState } from 'react';

import { useMyActQuery } from '@/hooks/reserve-status/useMyActivitiesQuery';

//import { useCalendar } from '@/utils/calendar';
import { DayCell } from './_components/calendar/DayCell';

export default function Page() {
  const { data } = useMyActQuery();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // calendarRef 제거

  // const { calendarDates, currentDate, goToPreviousMonth, goToNextMonth } =
  //   useCalendar({
  //     currentDate: new Date(),
  //     events: [],
  //     onDateSelect: (date) => {
  //       console.warn('선택된 날짜:', date);
  //     },
  //   });

  // useClickOutside 제거

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    console.log('클릭:', date);
  };

  const handleDeselect = () => {
    // 추가
    setSelectedDate(null);
  };

  if (!data) return null;

  const testReservations = {
    reserved: 5,
    confirmed: 3,
    completed: 2,
  };

  return (
    <div className='flex w-full flex-col gap-4 p-4'>
      <h1 className='text-2xl font-bold'>DayCell 테스트</h1>

      {/* ref 제거 */}
      <div className='flex w-full flex-col gap-4'>
        {/* 현재 월 날짜 (예약 있음) */}
        <div className='border p-4'>
          <h2 className='mb-2 font-semibold'>현재 월 - 예약 있음</h2>
          <DayCell
            isCurrentMonth
            date={new Date(2024, 2, 15)}
            isSelected={
              selectedDate?.getTime() === new Date(2024, 2, 15).getTime()
            }
            reservations={testReservations}
            onClick={handleDateClick}
            onDeselect={handleDeselect} // 추가
          />
        </div>

        {/* 현재 월 날짜 (예약 없음) */}
        <div className='border p-4'>
          <h2 className='mb-2 font-semibold'>현재 월 - 예약 없음</h2>
          <DayCell
            isCurrentMonth
            date={new Date(2024, 2, 16)}
            isSelected={
              selectedDate?.getTime() === new Date(2024, 2, 16).getTime()
            }
            onClick={handleDateClick}
            onDeselect={handleDeselect} // 추가
          />
        </div>

        {/* 이전 월 날짜 */}
        <div className='border p-4'>
          <h2 className='mb-2 font-semibold'>이전 월</h2>
          <DayCell date={new Date(2024, 1, 28)} isCurrentMonth={false} />
        </div>

        {/* 선택된 날짜 표시 */}
        <div className='border p-4'>
          <h2 className='mb-2 font-semibold'>
            선택된 날짜: {selectedDate?.toDateString()}
          </h2>
          <DayCell
            isCurrentMonth
            date={new Date(2024, 2, 17)}
            isSelected={
              selectedDate?.getTime() === new Date(2024, 2, 17).getTime()
            }
            reservations={testReservations}
            onClick={handleDateClick}
            onDeselect={handleDeselect} // 추가
          />
        </div>
      </div>
    </div>
  );
}
