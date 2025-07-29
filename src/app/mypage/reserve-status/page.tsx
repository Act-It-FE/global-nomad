// src/app/mypage/reserve-status/page.tsx

'use client';

import { useMyActQuery } from '@/hooks/reserve-status/useMyActivitiesQuery';
import { formatDateKorean, getMonthName, useCalendar } from '@/utils/calendar';

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

  if (!data) return null;

  return (
    <div className='flex w-full flex-col'>
      <div className='flex items-center gap-4'>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white'
          onClick={goToPreviousMonth}
        >
          이전 달
        </button>

        <h2>{getMonthName(currentDate)}</h2>

        <button
          className='rounded bg-blue-500 px-4 py-2 text-white'
          onClick={goToNextMonth}
        >
          다음 달
        </button>
      </div>

      {/* 월 변경 확인용 정보 */}
      <div className='mt-4 space-y-2'>
        <p>현재 월: {currentDate.getMonth() + 1}월</p>
        <p>현재 년도: {currentDate.getFullYear()}년</p>
        <p>월 이름: {getMonthName(currentDate)}</p>
        <p>총 날짜 개수: {calendarDates.length}개</p>

        {/* 처음 5개 날짜 보여주기 */}
        <div>
          <p>처음 5개 날짜:</p>
          <ul className='ml-4'>
            {calendarDates.slice(0, 5).map((date) => (
              <li key={date.date.toISOString()}>
                {formatDateKorean(date.date)}
                (이번달: {date.isCurrentMonth ? 'O' : 'X'})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
