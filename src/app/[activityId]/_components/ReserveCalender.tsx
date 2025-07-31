'use client';

import { useState } from 'react';

import Icon from '@/components/Icon';
import { getCalendarDates } from '@/utils/dateUtils';

const isSameMonth = (base: Date, target: Date) =>
  base.getFullYear() === target.getFullYear() &&
  base.getMonth() === target.getMonth();

export default function ReserveCalender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const dates = getCalendarDates(currentDate);

  const getMonthNameEnglish = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  };

  return (
    <div className='card-shadow w-full rounded-[24px] border border-gray-50 p-30'>
      <div className='txt-24_B mb-20 leading-29 text-gray-950'>
        ₩ 1000 <span className='txt-20_M leading-24 text-gray-300'>/ 인</span>
      </div>
      <p className='txt-16_B mb-10 leading-19'>날짜</p>
      <div className='mb-20 flex items-center justify-between'>
        <p className='txt-16_M leading-19 font-semibold'>
          {getMonthNameEnglish(currentDate)}
        </p>
        <div className='flex gap-20'>
          <button
            onClick={() =>
              setCurrentDate(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
              )
            }
          >
            <Icon className='h-24 w-24' icon='TriangleLeft' />
          </button>
          <button
            onClick={() =>
              setCurrentDate(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
              )
            }
          >
            <Icon className='h-24 w-24' icon='TriangleRight' />
          </button>
        </div>
      </div>

      <div className='grid grid-cols-7 gap-x-10 gap-y-10'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className='txt-16_M text-center font-semibold'>
            {day}
          </div>
        ))}

        {dates.map((date) => {
          const isCurrentMonth = isSameMonth(currentDate, date);

          return (
            <div
              key={date.toISOString()}
              className={`aspect-spuare txt-16_M laeding-19 rounded-full py-4 text-center ${
                isCurrentMonth
                  ? 'hover:text-primary-500 hover:bg-primary-100 cursor-pointer text-gray-800'
                  : 'txt-16_M cursor-default text-gray-300'
              }`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      <p className='mt-4'>
        참여 인원 수 <span>명수조절</span>
      </p>
      <div>예약 가능한 시간</div>
    </div>
  );
}
