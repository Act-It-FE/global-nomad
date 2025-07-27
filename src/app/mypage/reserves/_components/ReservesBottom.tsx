import { ReservationStatus } from '@/api/types/reservations';

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
  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex items-center gap-4'>
        <div>₩{reservesInfo.price?.toLocaleString()}</div>
        <div>{reservesInfo.headCount}명</div>
      </div>
      <ReservesSubmitButton
        isReviewSubmitted={reservesInfo.isReviewSubmitted}
        reservationId={reservesInfo.id}
        status={reservesInfo.status}
      />
    </div>
  );
}
