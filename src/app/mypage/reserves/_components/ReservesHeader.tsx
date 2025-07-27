import { ReservationStatus } from '@/api/types/reservations';
import { useMediaQuery } from '@/hooks/useMediaQuery';
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
    <div className='flex w-full flex-col items-start gap-12 leading-normal max-lg:gap-8'>
      <StatusBadge status={reservesHeaderInfo.status} />
      <div className='flex flex-col items-start gap-10 max-lg:gap-4'>
        <div className='txt-18_B max-lg:txt-14_B w-full tracking-[-0.45px] text-gray-950 max-lg:tracking-[-0.35px]'>
          {reservesHeaderInfo.title}
        </div>
        <Info
          date={reservesHeaderInfo.date}
          endTime={reservesHeaderInfo.endTime}
          startTime={reservesHeaderInfo.startTime}
        />
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
        'txt-13_B flex items-center justify-center rounded-[100px] px-8 py-4 tracking-[-0.325px]',
        `${statusColor[status || 'pending']} ${statusTextColor[status || 'pending']} `,
      )}
    >
      {statusText[status || 'pending']}
    </div>
  );
}

function Info({
  date,
  startTime,
  endTime,
}: {
  date?: string;
  startTime?: string;
  endTime?: string;
}) {
  const isPC = useMediaQuery('pc');
  return (
    <div className='flex tracking-[-0.4px] lg:gap-8'>
      {isPC ? (
        <div className='lg:txt-16_M flex items-center lg:text-gray-500'>
          <div className='txt-16_M mr-8'>{date}</div>
          <div className='txt'>•</div>
        </div>
      ) : (
        ''
      )}
      <div className='lg:txt-16_M txt-13_M text-gray-500'>
        {startTime} - {endTime}
      </div>
    </div>
  );
}
