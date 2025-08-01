'use client';

import { useState } from 'react';

import activitiesApi from '@/api/activitiesApi';
import { useActivityDetail } from '@/app/[activityId]/_hooks/queries/useActivityDetail';
import { useAvailableSchedule } from '@/app/[activityId]/_hooks/queries/useAvailableSchedule';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { OnlyTextContent } from '@/components/Modal/contents/OnlyTextContent';
import { getCalendarDates } from '@/utils/dateUtils';

const isSameMonth = (base: Date, target: Date) =>
  base.getFullYear() === target.getFullYear() &&
  base.getMonth() === target.getMonth();

interface TabletReserveCalendarProps {
  activityId: number;
}

export default function TabletReserveCalendar({
  activityId,
}: TabletReserveCalendarProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const year = String(currentDate.getFullYear());
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const dates = getCalendarDates(currentDate);

  const { data: detail } = useActivityDetail(activityId);
  const { data: schedules = [] } = useAvailableSchedule(
    activityId,
    year,
    month,
  );

  const price = detail?.price ?? null;
  const totalPrice = price ? price * peopleCount : null;

  const timeOptions = selectedDate
    ? (schedules.find((s) => s.date === selectedDate)?.times ?? [])
    : [];

  const handleDateClick = (date: Date) => {
    const formatted = date.toISOString().split('T')[0];
    const isAvailable = schedules.some((s) => s.date === formatted);
    if (!isAvailable) return;
    setSelectedDate(formatted);
    setSelectedTimeId(null);
    setStep(3);
  };

  const handleReserve = async () => {
    if (!selectedTimeId) return;
    try {
      setIsLoading(true);
      await activitiesApi.postReservation(activityId, {
        scheduleId: selectedTimeId,
        headCount: peopleCount,
      });
      setIsSuccessModalOpen(true);
      setStep(4);
    } catch (error) {
      alert('예약에 실패했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMonthName = (date: Date) =>
    new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long' }).format(
      date,
    );

  return (
    <div className='mt-40'>
      {step === 1 && (
        <Button className='w-full' onClick={() => setStep(2)}>
          날짜 선택하기
        </Button>
      )}

      {step === 2 && (
        <div>
          <div className='mb-20 flex justify-between'>
            <p className='txt-16_B'>{getMonthName(currentDate)}</p>
            <div className='flex gap-10'>
              <button
                onClick={() =>
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() - 1,
                      1,
                    ),
                  )
                }
              >
                <Icon className='h-20 w-20' icon='TriangleLeft' />
              </button>
              <button
                onClick={() =>
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() + 1,
                      1,
                    ),
                  )
                }
              >
                <Icon className='h-20 w-20' icon='TriangleRight' />
              </button>
            </div>
          </div>

          <div className='grid grid-cols-7 gap-5'>
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div key={day} className='txt-14_B text-center'>
                {day}
              </div>
            ))}
            {dates.map((date) => {
              const isCurrent = isSameMonth(currentDate, date);
              const formatted = date.toISOString().split('T')[0];
              const isAvailable = schedules.some((s) => s.date === formatted);
              return (
                <div
                  key={date.toISOString()}
                  className={`cursor-pointer rounded-full py-6 text-center ${isAvailable ? 'hover:bg-primary-100 hover:text-primary-500 text-gray-800' : 'text-gray-300'} ${selectedDate === formatted ? 'bg-primary-100 text-primary-500' : ''}`}
                  onClick={() =>
                    isCurrent && isAvailable && handleDateClick(date)
                  }
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className='mt-20'>
          <div className='txt-16_B mb-10'>시간 선택</div>
          <div className='flex flex-col gap-10'>
            {timeOptions.map((time) => (
              <Button
                key={time.id}
                className={`txt-14_M ${selectedTimeId === time.id ? 'bg-primary-100 text-primary-500' : ''}`}
                onClick={() => setSelectedTimeId(time.id)}
              >
                {time.startTime} - {time.endTime}
              </Button>
            ))}
          </div>

          <div className='mt-20 flex items-center justify-between'>
            <p className='txt-16_B'>인원 수</p>
            <div className='flex items-center gap-10'>
              <button
                disabled={peopleCount === 1}
                onClick={() => setPeopleCount((p) => Math.max(p - 1, 1))}
              >
                <Icon className='h-20 w-20' icon='Minus' />
              </button>
              <span className='txt-16_B'>{peopleCount}</span>
              <button
                disabled={peopleCount === 10}
                onClick={() => setPeopleCount((p) => Math.min(p + 1, 10))}
              >
                <Icon className='h-20 w-20' icon='Plus' />
              </button>
            </div>
          </div>

          <Button
            className='mt-30 w-full'
            disabled={!selectedTimeId}
            onClick={() => setStep(4)}
          >
            예약 정보 확인
          </Button>
        </div>
      )}

      {step === 4 && (
        <div className='mt-20'>
          <p className='txt-16_B mb-10'>예약 정보 확인</p>
          <p>날짜: {selectedDate}</p>
          <p>
            시간: {timeOptions.find((t) => t.id === selectedTimeId)?.startTime}{' '}
            ~ {timeOptions.find((t) => t.id === selectedTimeId)?.endTime}
          </p>
          <p>인원: {peopleCount}명</p>
          <p className='mb-20'>총 합계: ₩ {totalPrice?.toLocaleString()}</p>

          <Button
            className='w-full'
            disabled={isLoading}
            onClick={handleReserve}
          >
            {isLoading ? '예약 중...' : '예약하기'}
          </Button>
        </div>
      )}

      {isSuccessModalOpen && (
        <OnlyTextContent
          message='예약이 완료되었습니다!'
          variant='onlyText'
          onClose={() => {
            setIsSuccessModalOpen(false);
            setStep(1);
            setSelectedDate(null);
            setSelectedTimeId(null);
            setPeopleCount(1);
          }}
        />
      )}
    </div>
  );
}
