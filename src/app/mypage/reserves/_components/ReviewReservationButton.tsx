import { useState } from 'react';

import { ReservationStatus } from '@/api/types/reservations';
import Button from '@/components/Button';
import Modal from '@/components/Modal/Modal';
import Toast from '@/components/Toast';
import { useMyReservationsReview } from '@/hooks/reservations/useMyReservationsMutate';
import type { ModalProps } from '@/types/Modal';
import getErrorMessage from '@/utils/getErrorMessage';

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
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const formatSchedule = () => {
    const timeRange = startTime && endTime ? `${startTime} - ${endTime}` : '';
    const dateInfo = date || '';
    const countInfo = `(${headCount || 0}명)`;
    return [dateInfo, timeRange, countInfo].filter(Boolean).join(' / ');
  };

  const activitySchedule = formatSchedule();
  const handleReviewSubmit = () => {
    setModalProps({
      variant: 'review',
      activityName: title || '',
      activitySchedule: activitySchedule,
      onSubmit: (rating, comment) => {
        submitReview(
          {
            reservationId: reservationId,
            body: {
              rating: rating,
              content: comment,
            },
          },
          {
            onSuccess: () => {
              setToast({
                message: '리뷰가 성공적으로 제출되었습니다.',
                type: 'success',
              });
              setModalProps(null);
            },
            onError: (error) => {
              const errorMessage = getErrorMessage(
                error,
                '리뷰 제출에 실패했습니다. 다시 시도해주세요.',
              );
              setToast({
                message: errorMessage,
                type: 'error',
              });
              setModalProps(null);
            },
          },
        );
      },
      onClose: () => {
        setModalProps(null);
      },
    });
  };

  const handleToastClose = () => {
    setToast(null);
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
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={handleToastClose}
          />
        )}
      </>
    );
  }
  return null;
}
