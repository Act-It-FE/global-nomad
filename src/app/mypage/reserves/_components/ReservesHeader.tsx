import { ReservationStatus } from '@/api/types/reservations';
import { cn } from '@/utils/cn';

interface ReservesHeaderInfo {
  status?: ReservationStatus;
  title: string;
  date?: string;
  startTime?: string;
  endTime?: string;
}

export default function ReservesHeader({
  reservesHeaderInfo,
}: {
  reservesHeaderInfo: ReservesHeaderInfo;
}) {
  return (
    <div className='flex flex-col items-start gap-12'>
      <StatusBadge status={reservesHeaderInfo.status} />
      <div className='flex flex-col items-start gap-10'>
        <div>{reservesHeaderInfo.title}</div>
        <div className='flex'>
          <div>{reservesHeaderInfo.date}</div>
          <div className='flex items-center gap-10'>
            <div>
              {reservesHeaderInfo.startTime} - {reservesHeaderInfo.endTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status?: ReservationStatus }) {
  const statusText = {
    pending: '예약 완료',
    canceled: '예약 취소',
    confirmed: '예약 승인',
    declined: '예약 거절',
    completed: '체험 완료',
  };

  const statusColor = {
    pending: 'bg-[#f3fbe4]',
    canceled: 'bg-gray-100',
    confirmed: 'bg-[#DDF9F9]',
    declined: 'bg-[#FCECEA]',
    completed: 'bg-[#DAF0FF]',
  };

  const statusTextColor = {
    pending: 'text-[#2BA90D]',
    canceled: 'text-gray-600',
    confirmed: 'text-[#1790A0]',
    declined: 'text-[#F96767]',
    completed: 'text-[#0D6CD1]',
  };
  return (
    <div
      className={cn(
        'txt-13_B flex items-center justify-center rounded-[100px] px-8 py-4 leading-normal tracking-[-0.325px]',
        `${statusColor[status || 'pending']} ${statusTextColor[status || 'pending']} `,
      )}
    >
      {statusText[status || 'pending']}
    </div>
  );
}
