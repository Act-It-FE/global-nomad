'use client';

import Link from 'next/link';

import { ReservationStatus } from '@/api/types/reservations';
import { RESERVATION_STATUS_OPTIONS } from '@/constants/reservationStatus';
import { cn } from '@/utils/cn';

export default function ReservesFilter({
  selectedStatus,
  onStatusChange,
  isEmpty = false,
  statusOptions = RESERVATION_STATUS_OPTIONS,
}: {
  selectedStatus: ReservationStatus | null;
  onStatusChange: (status: ReservationStatus | null) => void;
  isEmpty?: boolean;
  statusOptions?: Array<{ value: ReservationStatus; label: string }>;
}) {
  const handleStatusClick = (value: ReservationStatus) => {
    const newStatus = selectedStatus === value ? null : value;
    onStatusChange(newStatus);
  };

  return (
    <div
      className={cn(
        'flex flex-col self-stretch',
        isEmpty ? 'items-center gap-40' : 'items-start gap-14',
      )}
    >
      <FilterHeader />
      {isEmpty ? (
        <div className='flex flex-col items-center justify-center leading-[normal]'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt='예약이 없어요'
            className='size-182 p-30'
            src='/images/empty-image.png'
          />
          <div className='txt-18_M mb-30 tracking-[-0.45px] text-gray-600'>
            아직 예약한 체험이 없어요
          </div>
          <Link
            className='txt-16_B bg-primary-500 flex w-full items-center justify-center rounded-2xl px-40 py-13 tracking-[-0.4px] text-white'
            href='/'
          >
            둘러보기
          </Link>
        </div>
      ) : (
        <FilterContent
          selectedStatus={selectedStatus}
          statusOptions={statusOptions}
          onStatusClick={handleStatusClick}
        />
      )}
    </div>
  );
}

function FilterHeader() {
  return (
    <div className='flex flex-col items-start justify-center gap-10 self-stretch py-10 leading-normal'>
      <div className='txt-18_B tracking-[-0.45px]'>예약 내역</div>
      <div className='txt-14_M tracking-[-0.35px] text-gray-500'>
        예약내역 변경 및 취소할 수 있습니다.
      </div>
    </div>
  );
}

function FilterContent({
  statusOptions,
  selectedStatus,
  onStatusClick,
}: {
  statusOptions: Array<{ value: ReservationStatus; label: string }>;
  selectedStatus: ReservationStatus | null;
  onStatusClick: (value: ReservationStatus) => void;
}) {
  return (
    <div className='flex w-full gap-8 overflow-x-auto leading-normal'>
      {statusOptions.map((option) => (
        <button
          key={option.value}
          className={cn(
            'txt-14_M flex items-center justify-center rounded-full border px-16 py-10 leading-normal text-nowrap',
            selectedStatus === option.value
              ? 'bg-[#333333] text-white'
              : 'border-[#D8D8D8] bg-white text-black',
          )}
          onClick={() => onStatusClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
