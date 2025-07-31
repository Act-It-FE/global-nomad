'use client';

import { useEffect, useState } from 'react';

import activitiesApi from '@/api/activitiesApi';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { OnlyTextContent } from '@/components/Modal/contents/OnlyTextContent';
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
  const [schedules, setSchedules] = useState<
    {
      date: string;
      times: { id: number; startTime: string; endTime: string }[];
    }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeOptions, setTimeOptions] = useState<
    { id: number; startTime: string; endTime: string }[]
  >([]);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchAvailableSchedule = async () => {
      try {
        const res = await activitiesApi.getAvailableSchedule(activityId, {
          year: String(currentDate.getFullYear()),
          month: String(currentDate.getMonth() + 1).padStart(2, '0'),
        });
        setSchedules(res);
      } catch (error) {
        console.error('예약 가능 스케줄 불러오기 실패', error);
      }
    };

    fetchAvailableSchedule();
  }, [activityId, currentDate]);

  const handleDateClick = (date: Date) => {
    const formatted = date.toISOString().split('T')[0];
    const found = schedules.find((s) => s.date === formatted);
    setSelectedDate(formatted);
    setTimeOptions(found?.times || []);
    setSelectedTimeId(null);
  };

  const increaseCount = () => {
    setPeopleCount((prev) => Math.min(prev + 1, 10));
  };

  const decreaseCount = () => {
    setPeopleCount((prev) => Math.max(prev - 1, 1));
  };

  const totalPrice = price !== null ? price * peopleCount : null;

  const handleReserve = async () => {
    if (!selectedTimeId) return;

    try {
      setIsLoading(true);
      await activitiesApi.postReservation(activityId, {
        scheduleId: selectedTimeId,
        peopleCount,
      });
      setIsSuccessModalOpen(true);
    } catch (error) {
      alert('예약에 실패했습니다. 다시 시도해주세요.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
          const formatted = date.toISOString().split('T')[0];
          const isAvailable = schedules.some((s) => s.date === formatted);

          return (
            <div
              key={date.toISOString()}
              className={`txt-16_M aspect-square rounded-full py-10 text-center leading-19 ${
                isCurrentMonth
                  ? isAvailable
                    ? 'hover:text-primary-500 hover:bg-primary-100 cursor-pointer text-gray-800'
                    : 'cursor-default text-gray-300'
                  : 'cursor-default text-gray-300'
              } ${
                selectedDate === formatted
                  ? 'bg-primary-100 text-primary-500'
                  : ''
              }`}
              onClick={() =>
                isCurrentMonth && isAvailable && handleDateClick(date)
              }
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      <div className='txt-16_B mt-24 flex flex-row items-center justify-between leading-19'>
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
        {timeOptions.length > 0 ? (
          timeOptions.map((time) => (
            <Button
              key={time.id}
              className={`txt-16_M active:bg-primary-100 h-51 rounded-[11px] leading-19 ${
                selectedTimeId === time.id
                  ? 'bg-primary-100 text-primary-500 border-primary-500 border-2 active:bg-blue-200'
                  : 'text-gray'
              }`}
              variant='secondary'
              onClick={() => setSelectedTimeId(time.id)}
            >
              {time.startTime} - {time.endTime}
            </Button>
          ))
        ) : (
          <p className='text-sm text-gray-400'>날짜를 선택해 주세요</p>
        )}
      </div>

      <div className='mt-40 flex flex-row items-center justify-between border-t border-gray-300'>
        <p className='txt-20_M mt-20 text-gray-300'>
          총 합계{' '}
          <span className='txt-20_B text-gray-950'>
            ₩ {totalPrice?.toLocaleString()}
          </span>
        </p>
        <Button
          className='mt-20 h-50 w-135 rounded-[14px]'
          disabled={!selectedDate || selectedTimeId === null || isLoading}
          variant='primary'
          onClick={handleReserve}
        >
          {isLoading ? '예약 중...' : '예약하기'}
        </Button>
      </div>

      {isSuccessModalOpen && (
        <OnlyTextContent
          message='예약이 완료되었습니다!'
          variant='onlyText'
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}
    </div>
  );
}
