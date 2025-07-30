import { useRef } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';
import { useCalendarStore } from '@/stores/calendarStore';
import { cn } from '@/utils/cn';
import { isSameDate } from '@/utils/dateUtils';

interface DayCellProps {
  // 기본 날짜 정보
  date: Date;
  isCurrentMonth: boolean; // 현재 월인지 (흐리게 표시할지)

  // 예약 정보
  reservations?: {
    pending: number; // 예약: 2
    confirmed: number; // 승인: 8
    completed: number; // 완료: 10
  };

  // 로딩 상태
  isLoading?: boolean;
}

export function DayCell({ date, isCurrentMonth, reservations }: DayCellProps) {
  const cellRef = useRef<HTMLButtonElement>(null);
  const { selectedDate, setSelectedDate, setIsModalOpen } = useCalendarStore();

  // 예약이 있는지 확인
  const hasReservations =
    reservations && (reservations.pending > 0 || reservations.confirmed > 0);

  const handleClick = () => {
    // 예약이 있을 때만 클릭 가능
    if (hasReservations) {
      setSelectedDate(date);
      setIsModalOpen(true);
    }
  };

  const isSelected = selectedDate ? isSameDate(date, selectedDate) : false;

  // 다른 곳 클릭 시 선택 해제
  useClickOutside(cellRef, () => {
    if (isSelected) {
      setSelectedDate(null); // store에서 직접 해제
    }
  });

  if (!isCurrentMonth) {
    return (
      <div className='flex h-124 flex-col items-center gap-5 border-t border-gray-50 px-4 pt-10 pb-6 md:px-12 md:pt-18 md:pb-10'>
        <span className='md:txt-16_M txt-12_M leading-[normal] tracking-[-0.4px] text-gray-300'>
          {date.getDate()}
        </span>
      </div>
    );
  }

  return (
    <button
      ref={cellRef}
      aria-label={hasReservations ? '예약 상세 보기' : '예약 없음'}
      className={cn(
        'relative flex h-124 flex-col items-center gap-5 border-t border-gray-50 px-4 pt-10 pb-6 md:px-12 md:pt-18 md:pb-10',
        isSelected && 'border-primary-500 border',
      )}
      disabled={!hasReservations} // 예약이 없으면 비활성화
      onClick={handleClick}
    >
      <span className='md:txt-16_M txt-12_M leading-[normal] tracking-[-0.3px] text-gray-800 md:tracking-[-0.4px]'>
        {date.getDate()}
      </span>
      {reservations && (
        <div className='absolute top-9 right-16 size-4 rounded-full bg-red-500 md:top-13 md:right-12 md:size-6' />
      )}
      {reservations && reservations.pending > 0 && (
        <Badge count={reservations.pending} label='예약' />
      )}
      {reservations && reservations.confirmed > 0 && (
        <Badge count={reservations.confirmed} label='승인' />
      )}
      {reservations && reservations.completed > 0 && (
        <Badge count={reservations.completed} label='완료' />
      )}
    </button>
  );
}

interface BadgeProps {
  label: string;
  count: number;
}

function Badge({ label, count }: BadgeProps) {
  const color = {
    예약: 'bg-primary-100',
    승인: 'bg-[#FFF8DD]',
    완료: 'bg-gray-50',
  };

  const textColor = {
    예약: 'text-primary-500',
    승인: 'text-[#FFB051]',
    완료: 'text-gray-500',
  };

  return (
    <div
      className={cn(
        'md:txt-14_M txt-11_M flex items-center justify-center gap-2 self-stretch rounded-sm px-8 py-2 leading-[normal] tracking-[-0.35px]',
        color[label as keyof typeof color],
        textColor[label as keyof typeof textColor],
      )}
    >
      <span>{label}</span>
      <span>{count}</span>
    </div>
  );
}
