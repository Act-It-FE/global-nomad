'use client';

import { useEffect, useRef, useState } from 'react';

import activitiesApi from '@/api/activitiesApi';
import { useActivityDetail } from '@/app/[activityId]/_hooks/queries/useActivityDetail';
import { useAvailableSchedule } from '@/app/[activityId]/_hooks/queries/useAvailableSchedule';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useUserStore } from '@/stores/userStore';
import { getCalendarDates } from '@/utils/dateUtils';

const isSameMonth = (base: Date, target: Date) =>
  base.getFullYear() === target.getFullYear() &&
  base.getMonth() === target.getMonth();

interface MobileReserveModalProps {
  activityId: number;
  onClose: () => void;
  onReserved: () => void;
}

export default function MobileReserveModal({
  activityId,
  onClose,
  onReserved,
}: MobileReserveModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [peopleCount, setPeopleCount] = useState(1);
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

  const user = useUserStore((state) => state.user);
  const isMyActivity = user && detail?.userId === user.id;

  const price = detail?.price ?? null;
  const totalPrice = price ? price * peopleCount : null;

  const timeOptions = selectedDate
    ? (schedules.find((s) => s.date === selectedDate)?.times ?? [])
    : [];

  const handleReserve = async () => {
    if (!selectedTimeId) return;
    try {
      setIsLoading(true);
      await activitiesApi.postReservation(activityId, {
        scheduleId: selectedTimeId,
        headCount: peopleCount,
      });
      onReserved();
      setSelectedDate(null);
      setSelectedTimeId(null);
      setPeopleCount(1);
    } catch (error) {
      alert('예약에 실패했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMonthNameEnglish = (date: Date): string =>
    new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(
      date,
    );

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  if (isMyActivity) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-end justify-center bg-black/40'>
      <div
        ref={modalRef}
        className='h-[80vh] w-full overflow-y-auto rounded-t-2xl bg-white p-20'
      >
        {/* 날짜 선택 */}
        <div className='txt-18_B'>날짜</div>
        <div className='my-20 flex justify-between'>
          <p className='txt-16_B'>{getMonthNameEnglish(currentDate)}</p>
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
              <Icon className='h-24 w-24' icon='TriangleLeft' />
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
              <Icon className='h-24 w-24' icon='TriangleRight' />
            </button>
          </div>
        </div>

        {/* 캘린더 */}
        <div className='grid grid-cols-7 gap-10 text-center'>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div
              key={`${day}-${index}`}
              className='txt-16_M text-center font-semibold'
            >
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
                className={`txt-16_M flex aspect-square cursor-pointer items-center justify-center rounded-full text-center ${
                  isAvailable
                    ? 'hover:bg-primary-100 hover:text-primary-500 text-gray-800'
                    : 'text-gray-300'
                } ${
                  selectedDate === formatted ? 'bg-primary-500 text-white' : ''
                }`}
                onClick={() =>
                  isCurrent && isAvailable && setSelectedDate(formatted)
                }
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>

        {/* 시간 선택 */}
        <div className='mt-24'>
          <p className='txt-16_B mb-12 text-gray-950'>예약 가능한 시간</p>
          {selectedDate ? (
            <div className='flex flex-col gap-10'>
              {timeOptions.map((time) => (
                <Button
                  key={time.id}
                  className={`txt-14_M h-50 ${
                    selectedTimeId === time.id
                      ? 'border-primary-500 bg-primary-100 text-primary-500 border-2'
                      : ''
                  }`}
                  variant='secondary'
                  onClick={() => setSelectedTimeId(time.id)}
                >
                  {time.startTime} - {time.endTime}
                </Button>
              ))}
            </div>
          ) : (
            <p className='txt-16_M text-center text-gray-400'>
              날짜를 선택해주세요.
            </p>
          )}
        </div>

        {/* 인원 선택 */}
        <div className='txt-16_B mt-24 leading-19'>
          <p className='mb-10'>참여 인원 수</p>
          <div className='flex h-50 w-full items-center justify-between rounded-[12px] border border-gray-50 px-20'>
            <button
              disabled={peopleCount === 1}
              onClick={() => setPeopleCount((p) => Math.max(1, p - 1))}
            >
              <Icon className='h-20 w-20' icon='Minus' />
            </button>
            <span className='txt-16_B'>{peopleCount}</span>
            <button
              disabled={peopleCount === 10}
              onClick={() => setPeopleCount((p) => Math.min(10, p + 1))}
            >
              <Icon className='h-20 w-20' icon='Plus' />
            </button>
          </div>
        </div>

        {/* 가격 및 시간 요약 */}
        {price !== null && (
          <div className='mt-24'>
            <div className='mb-12 flex justify-between'>
              <span className='txt-16_B'>
                ₩ {totalPrice?.toLocaleString()}{' '}
                <span className='txt-16_M text-gray-300'>
                  / {peopleCount}명
                </span>
              </span>
              {selectedDate && selectedTimeId && (
                <span className='txt-14_B text-primary-500 underline'>
                  {selectedDate.replaceAll('-', '/')}{' '}
                  {timeOptions.find((t) => t.id === selectedTimeId)?.startTime}{' '}
                  ~ {timeOptions.find((t) => t.id === selectedTimeId)?.endTime}
                </span>
              )}
            </div>
          </div>
        )}

        <Button
          className='mt-20 h-50 w-full'
          disabled={!selectedDate || !selectedTimeId || isLoading}
          onClick={handleReserve}
        >
          {isLoading ? '예약 중...' : '예약하기'}
        </Button>
      </div>
    </div>
  );
}
