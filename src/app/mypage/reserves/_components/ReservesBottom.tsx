import { MyReservation } from '@/api/types/reservations';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import CancelReservationButton from './CancelReservationButton';
import ReviewReservationButton from './ReviewReservationButton';

export function ReservesBottom({
  reservesInfo,
}: {
  reservesInfo: MyReservation;
}) {
  const isPC = useMediaQuery('pc');
  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex items-center gap-4 leading-normal'>
        <div className='txt-16_B lg:txt-18_B tracking-[-0.4px] text-gray-950 lg:tracking-[-0.45px]'>
          ₩{reservesInfo.totalPrice?.toLocaleString()}
        </div>
        <div className='txt-14_M lg:txt-16_M text-center tracking-[-0.35px] text-gray-400 lg:tracking-[-0.4px]'>
          {reservesInfo.headCount}명
        </div>
      </div>
      {isPC && reservesInfo.id && (
        <>
          {reservesInfo.status === 'pending' && (
            <CancelReservationButton reservationId={reservesInfo.id} />
          )}
          {reservesInfo.status === 'completed' &&
            !reservesInfo.reviewSubmitted && (
              <ReviewReservationButton
                date={reservesInfo.date}
                endTime={reservesInfo.endTime}
                headCount={reservesInfo.headCount}
                isReviewSubmitted={reservesInfo.reviewSubmitted}
                reservationId={reservesInfo.id}
                startTime={reservesInfo.startTime}
                status={reservesInfo.status}
                title={reservesInfo.activity?.title}
              />
            )}
        </>
      )}
    </div>
  );
}
