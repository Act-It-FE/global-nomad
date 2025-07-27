import { useState } from 'react';

import { ReservationStatus } from '@/api/types/reservations';
import Button from '@/components/Button';
import Modal from '@/components/Modal/Modal';
import { useMyReservationsReview } from '@/hooks/reservations/useMyReservationsMutate';
import type { ModalProps } from '@/types/Modal';

export default function ReviewReservationButton({
  status,
  isReviewSubmitted,
  reservationId,
  title,
  headCount,
  date,
  startTime,
  endTime,
}: {
  status?: ReservationStatus;
  isReviewSubmitted?: boolean;
  reservationId: number;
  title?: string;
  headCount?: number;
  date?: string;
  startTime?: string;
  endTime?: string;
}) {
  const { mutate: submitReview } = useMyReservationsReview();
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const activitySchedule = `${date || ''} / ${startTime || ''} - ${endTime || ''} (${headCount || 0}명)`;
  const handleReviewSubmit = () => {
    setModalProps({
      variant: 'review',
      activityName: title || '',
      activitySchedule: activitySchedule,
      onSubmit: (rating, comment) => {
        submitReview({
          reservationId: reservationId,
          body: {
            rating: rating,
            content: comment,
          },
        });
        setModalProps(null);
      },
      onClose: () => {
        setModalProps(null);
      },
    });
  };

  if (status === 'completed' && !isReviewSubmitted) {
    return (
      <>
        <Button
          className='txt-14_M px-10 py-6 max-lg:w-full'
          rounded='8'
          variant='primary'
          onClick={handleReviewSubmit}
        >
          후기 작성
        </Button>
        {modalProps && <Modal {...modalProps} />}
      </>
    );
  }
  return null;
}
