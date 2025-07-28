'use client';

import { cn } from '@/utils/cn';

export default function ReservesFilter({
  selectedStatus,
  onStatusChange,
}: {
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
}) {
  const statusOptions = [
    { value: 'pending', label: '예약 완료' },
    { value: 'canceled', label: '예약 취소' },
    { value: 'confirmed', label: '예약 승인' },
    { value: 'declined', label: '예약 거절' },
    { value: 'completed', label: '체험 완료' },
  ];

  const handleStatusClick = (value: string) => {
    const newStatus = selectedStatus === value ? null : value;
    onStatusChange(newStatus);
  };

  return (
    <div className='flex flex-col items-start gap-14 self-stretch'>
      <FilterHeader />
      <FilterContent
        selectedStatus={selectedStatus}
        statusOptions={statusOptions}
        onStatusClick={handleStatusClick}
      />
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
  statusOptions: Array<{ value: string; label: string }>;
  selectedStatus: string | null;
  onStatusClick: (value: string) => void;
}) {
  return (
    <div className='flex items-start gap-8 overflow-x-auto'>
      {statusOptions.map((option) => (
        <button
          key={option.value}
          className={cn(
            'txt-14_M flex items-center justify-center rounded-full border px-16 py-10 text-nowrap',
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
