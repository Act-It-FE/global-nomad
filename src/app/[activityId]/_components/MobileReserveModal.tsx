'use client';

import { useEffect, useRef, useState } from 'react';

import activitiesApi from '@/api/activitiesApi';
import { useActivityDetail } from '@/app/[activityId]/_hooks/queries/useActivityDetail';
import { useAvailableSchedule } from '@/app/[activityId]/_hooks/queries/useAvailableSchedule';
import {
  getKSTDateString,
  getMonthNameEnglish,
  isSameMonth,
} from '@/app/[activityId]/_utils/activityDetailDates';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useUserStore } from '@/stores/userStore';
import { getCalendarDates } from '@/utils/dateUtils';

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

  const [step, setStep] = useState<1 | 2 | 3>(1);
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

  const handleGoStep2 = () => {
    setTimeout(() => {
      setStep(2);
    }, 10);
  };

  const handleGoStep3 = () => {
    setTimeout(() => {
      setStep(3);
    });
  };

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
      setStep(1);
    } catch (error) {
      alert('예약에 실패했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
        className={`w-full overflow-y-auto rounded-t-2xl bg-white p-20 transition-all duration-300 ${
          step === 1 ? 'h-[80vh]' : step === 2 ? 'h-[40vh]' : 'h-[20vh]'
        }`}
      >
        {step === 1 && (
          <>
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

            <div className='grid grid-cols-7 gap-10 text-center'>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className='txt-16_M font-semibold'>
                  {day}
                </div>
              ))}
              {dates.map((date) => {
                const isCurrent = isSameMonth(currentDate, date);
                const formatted = getKSTDateString(date);
                const isAvailable = schedules.some((s) => s.date === formatted);
                const isSelected = selectedDate === formatted;

                return (
                  <div
                    key={date.toISOString()}
                    className={`txt-16_M flex aspect-square cursor-pointer items-center justify-center rounded-full ${
                      isAvailable
                        ? 'hover:bg-primary-100 hover:text-primary-500 text-gray-800'
                        : 'text-gray-300'
                    } ${isSelected ? 'bg-primary-500 text-white' : ''}`}
                    onClick={() =>
                      isCurrent &&
                      isAvailable &&
                      setSelectedDate((prev) =>
                        prev === formatted ? null : formatted,
                      )
                    }
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>

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
                      onClick={() =>
                        setSelectedTimeId((prev) =>
                          prev === time.id ? null : time.id,
                        )
                      }
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

            <Button
              className='mt-24 h-50 w-full'
              disabled={!selectedDate || !selectedTimeId}
              onClick={handleGoStep2}
            >
              다음
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className='flex flex-row gap-4'>
              <button onClick={() => setStep(1)}>
                <Icon className='h-24 w-24' icon='ArrowLeft' />
              </button>
              <p className='txt-18_B leading-21'>인원</p>
            </div>
            <p className='txt-16_M my-10 leading-19'>
              예약할 인원을 선택해주세요.
            </p>
            <div className='txt-16_B mt-10 flex flex-row items-center justify-between'>
              <p>참여 인원 수</p>
              <div className='mt-10 flex h-50 w-144 items-center justify-between rounded-[12px] border border-gray-50 px-20'>
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

            <Button
              className='mt-24 h-50 w-full'
              disabled={peopleCount < 1}
              onClick={handleGoStep3}
            >
              다음
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            {price !== null && (
              <div className='mt-24'>
                <div className='mb-12 flex justify-between'>
                  <span className='txt-16_B'>
                    ₩ {totalPrice?.toLocaleString()}{' '}
                    <span className='txt-16_M text-gray-300'>
                      / {peopleCount}명
                    </span>
                  </span>
                  <span className='txt-14_B text-primary-500 underline'>
                    {selectedDate?.replaceAll('-', '/')}{' '}
                    {
                      timeOptions.find((t) => t.id === selectedTimeId)
                        ?.startTime
                    }{' '}
                    ~{' '}
                    {timeOptions.find((t) => t.id === selectedTimeId)?.endTime}
                  </span>
                </div>
              </div>
            )}

            <Button
              className='mt-20 h-50 w-full'
              disabled={isLoading}
              onClick={handleReserve}
            >
              {isLoading ? '예약 중...' : '예약하기'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
