import { ReservationStatus } from '@/api/types/reservations';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import ReservesSubmitButton from './ReservesSubmitButton';

interface ReservesBottomInfo {
  price?: number;
  headCount?: number;
  status?: ReservationStatus;
  isReviewSubmitted?: boolean;
  id?: number;
}

export function ReservesBottom({
  reservesInfo,
}: {
  reservesInfo: ReservesBottomInfo;
}) {
  const isPC = useMediaQuery('pc');
  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex items-center gap-4 leading-normal'>
        <div className='txt-16_B lg:txt-18_B tracking-[-0.4px] text-gray-950 lg:tracking-[-0.45px]'>
          ₩{reservesInfo.price?.toLocaleString()}
        </div>
        <div className='txt-14_M lg:txt-16_M tracking-[-0.35px] text-gray-400 lg:tracking-[-0.4px]'>
          {reservesInfo.headCount}명
        </div>
      </div>
      {isPC && reservesInfo.id && (
        <ReservesSubmitButton
          {...reservesInfo}
          reservationId={reservesInfo.id}
        />
      )}
    </div>
  );
}
