'use client';

import { useEffect, useState } from 'react';

import activitiesApi from '@/api/activitiesApi';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { getCalendarDates } from '@/utils/dateUtils';

const isSameMonth = (base: Date, target: Date) =>
  base.getFullYear() === target.getFullYear() &&
  base.getMonth() === target.getMonth();

interface ReserveCalenderProps {
  activityId: number;
}

export default function ReserveCalender({ activityId }: ReserveCalenderProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [price, setPrice] = useState<number | null>(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const dates = getCalendarDates(currentDate);

  const getMonthNameEnglish = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await activitiesApi.getDetail(activityId);
        setPrice(data.price);
      } catch (error) {
        console.error('가격 정보를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchDetail();
  }, [activityId]);

  const increaseCount = () => {
    setPeopleCount((prev) => Math.min(prev + 1, 10));
  };

  const decreaseCount = () => {
    setPeopleCount((prev) => Math.max(prev - 1, 1));
  };

  const totalPrice = price !== null ? price * peopleCount : null;

  return (
    <div className='card-shadow w-full rounded-[24px] border border-gray-50 p-30'>
      <div className='txt-24_B mb-20 leading-29 text-gray-950'>
        ₩ {price !== null ? price.toLocaleString() : '...'}{' '}
        <span className='txt-20_M leading-24 text-gray-300'>/ 인</span>
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
      <div className='txt-16_B mt-4 mt-24 flex flex-row items-center justify-between leading-19'>
        참여 인원 수{' '}
        <span className='flex min-w-140 flex-row justify-evenly gap-5 rounded-[24px] border border-gray-50 py-8'>
          <button disabled={peopleCount === 1} onClick={decreaseCount}>
            <Icon className='h-20 w-20' icon='Minus' />
          </button>
          <span className='txt-16_B leading-19'>{peopleCount}</span>
          <button disabled={peopleCount === 10} onClick={increaseCount}>
            <Icon className='h-20 w-20' icon='Plus' />
          </button>
        </span>
      </div>
      <div className='txt-16_B mt-24 leading-19'>예약 가능한 시간</div>
      <div className='my-10 flex flex-col gap-15'>
        <Button
          className='txt-16_M text-gray h-51 rounded-[11px] leading-19'
          variant='secondary'
        >
          시간
        </Button>
        <Button
          className='txt-16_M text-gray h-51 rounded-[11px] leading-19'
          variant='secondary'
        >
          시간
        </Button>
      </div>
      <div className='mt-40 flex flex-row items-center justify-between border-t border-gray-300'>
        <p className='txt-20_M mt-20 text-gray-300'>
          총 합계 <span className='txt-20_B text-gray-950'>₩ {totalPrice}</span>
        </p>
        <Button className='mt-20 h-50 w-135 rounded-[14px]' variant='primary'>
          예약하기
        </Button>
      </div>
    </div>
  );
}
