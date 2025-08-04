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

interface TabletReserveModalProps {
  activityId: number;
  onClose: () => void;
  onReserved: () => void;
}

export default function TabletReserveModal({
  activityId,
  onClose,
  onReserved,
}: TabletReserveModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

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
    } catch (error) {
      alert('예약에 실패했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoStep2 = () => {
    setTimeout(() => {
      setStep(2);
    }, 10);
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
        className='max-h-[80vh] w-full overflow-y-auto rounded-t-2xl bg-white p-20'
      >
        {step === 1 && (
          <>
            {/* 달 상단 */}
            <div className='txt-20_B'>날짜</div>
            <div className='my-20 flex justify-between'>
              <p className='txt-16_M'>{getMonthNameEnglish(currentDate)}</p>
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

            {/* 캘린더 + 시간/인원 */}
            <div className='flex h-420 flex-row gap-20'>
              {/* 캘린더 */}
              <div className='w-1/2'>
                <div className='grid grid-cols-7 gap-10 text-center'>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className='txt-14_B'>
                      {day}
                    </div>
                  ))}
                  {dates.map((date) => {
                    const isCurrent = isSameMonth(currentDate, date);
                    const formatted = getKSTDateString(date);
                    const isAvailable = schedules.some(
                      (s) => s.date === formatted,
                    );
                    return (
                      <div
                        key={formatted}
                        className={`txt-16_M flex aspect-square cursor-pointer items-center justify-center rounded-full ${
                          isAvailable
                            ? 'hover:bg-primary-100 hover:text-primary-500 text-gray-800'
                            : 'text-gray-300'
                        } ${
                          selectedDate === formatted
                            ? 'bg-primary-500 text-white'
                            : ''
                        }`}
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
              </div>

              {/* 시간/인원 */}
              <div className='card-shadow w-1/2 rounded-[24px] px-20 py-24'>
                <div className='txt-16_B mb-10'>예약 가능한 시간</div>
                {selectedDate ? (
                  <>
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

                    <div className='txt-16_B mt-24 flex flex-col justify-between gap-20'>
                      참여 인원 수
                      <span className='flex h-50 min-w-253 items-center justify-evenly gap-5 rounded-[12px] border border-gray-50 py-8'>
                        <button
                          disabled={peopleCount === 1}
                          onClick={() =>
                            setPeopleCount((p) => Math.max(1, p - 1))
                          }
                        >
                          <Icon className='h-20 w-20' icon='Minus' />
                        </button>
                        <span className='txt-16_B'>{peopleCount}</span>
                        <button
                          disabled={peopleCount === 10}
                          onClick={() =>
                            setPeopleCount((p) => Math.min(10, p + 1))
                          }
                        >
                          <Icon className='h-20 w-20' icon='Plus' />
                        </button>
                      </span>
                    </div>
                  </>
                ) : (
                  <p className='txt-14_M text-gray-400'>날짜를 선택해주세요.</p>
                )}
              </div>
            </div>

            {/* 다음 버튼 */}
            <div className='mt-24'>
              <Button
                className='h-50 w-full'
                disabled={!selectedDate || !selectedTimeId}
                onClick={handleGoStep2}
              >
                다음
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* 요약 + 예약 */}
            <div className='flex items-center justify-between'>
              <span className='txt-16_B'>
                ₩ {totalPrice?.toLocaleString()}{' '}
                <span className='text-gray-300'>/ {peopleCount}명</span>
              </span>

              {selectedDate && selectedTimeId && (
                <p className='txt-14_B text-primary-500 mb-10'>
                  {selectedDate.replaceAll('-', '/')}{' '}
                  {timeOptions.find((t) => t.id === selectedTimeId)?.startTime}{' '}
                  ~ {timeOptions.find((t) => t.id === selectedTimeId)?.endTime}
                </p>
              )}
            </div>
            <Button
              className='mt-10 h-50 w-full'
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
