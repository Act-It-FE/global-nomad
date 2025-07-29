import { useRef } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/utils/cn';

interface DayCellProps {
  // 기본 날짜 정보
  date: Date;
  isCurrentMonth: boolean; // 현재 월인지 (흐리게 표시할지)

  // 예약 정보
  reservations?: {
    reserved: number; // 예약: 2
    confirmed: number; // 승인: 8
    completed: number; // 완료: 10
  };

  // 상호작용
  isSelected?: boolean; // 선택된 날짜인지
  onClick?: (date: Date) => void; // 클릭 이벤트
  onDeselect?: () => void; // 선택 해제 이벤트 추가
}

export function DayCell({
  date,
  isCurrentMonth,
  reservations,
  isSelected,
  onClick,
  onDeselect, // 추가
}: DayCellProps) {
  const cellRef = useRef<HTMLButtonElement>(null); // ref 추가

  // 다른 곳 클릭 시 선택 해제
  useClickOutside(cellRef, () => {
    if (isSelected && onDeselect) {
      onDeselect();
    }
  });

  const handleClick = () => {
    if (onClick) {
      onClick(date);
    }
  };

  if (!isCurrentMonth) {
    return (
      <div className='flex h-124 flex-col items-center gap-5 bg-white px-4 pt-10 pb-6 md:px-12 md:pt-18 md:pb-10'>
        <span className='txt-16_M leading-[normal] tracking-[-0.4px] text-gray-300'>
          {date.getDate()}
        </span>
      </div>
    );
  }

  return (
    <button
      ref={cellRef} // ref 추가
      className={cn(
        'relative flex h-124 flex-col items-center gap-5 bg-white px-4 pt-10 pb-6 md:px-12 md:pt-18 md:pb-10',
        isSelected && 'border-primary-500 border',
      )}
      onClick={handleClick}
    >
      <span className='md:txt-16_M txt-12_M leading-[normal] tracking-[-0.3px] text-gray-800 md:tracking-[-0.4px]'>
        {date.getDate()}
      </span>
      {reservations && (
        <div className='absolute top-9 right-16 size-4 rounded-full bg-red-500 md:top-13 md:right-12 md:size-6' />
      )}
      {reservations?.reserved && (
        <Badge count={reservations.reserved} label='예약' />
      )}
      {reservations?.confirmed && (
        <Badge count={reservations.confirmed} label='승인' />
      )}
      {reservations?.completed && (
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
